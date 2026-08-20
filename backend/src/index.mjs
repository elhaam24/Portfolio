import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { randomUUID } from 'node:crypto';

const tableName = process.env.CONTACT_TABLE_NAME;
const fromEmail = process.env.NOTIFICATION_FROM_EMAIL;
const toEmail = process.env.NOTIFICATION_TO_EMAIL;
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});

const text = (value, maxLength) => typeof value === 'string'
  ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, maxLength)
  : '';

function validate(body) {
  const submission = {
    name: text(body?.name, 100),
    email: text(body?.email, 254).toLowerCase(),
    subject: text(body?.subject, 150),
    message: text(body?.message, 5000),
  };
  const errors = {};
  if (submission.name.length < 1) errors.name = 'Name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) errors.email = 'A valid email is required.';
  if (submission.subject.length < 1) errors.subject = 'Subject is required.';
  if (submission.message.length < 1) errors.message = 'Message is required.';
  return { submission, errors };
}

const response = (statusCode, body) => ({ statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

export const handler = async (event) => {
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return response(400, { message: 'Request body must be valid JSON.' }); }
  const { submission, errors } = validate(body);
  if (Object.keys(errors).length) return response(400, { message: 'Please correct the highlighted fields.', errors });
  if (!tableName || !fromEmail || !toEmail) {
    console.error('Missing required function configuration.');
    return response(500, { message: 'The contact service is unavailable.' });
  }

  const submissionId = randomUUID();
  const submittedAt = new Date().toISOString();
  const item = { submissionId, submittedAt, ...submission };
  try {
    await dynamo.send(new PutCommand({ TableName: tableName, Item: item, ConditionExpression: 'attribute_not_exists(submissionId)' }));
    await ses.send(new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: `Portfolio contact: ${submission.subject}`, Charset: 'UTF-8' },
        Body: { Text: { Charset: 'UTF-8', Data: `New portfolio contact submission\n\nName: ${submission.name}\nEmail: ${submission.email}\nSubject: ${submission.subject}\nSubmitted: ${submittedAt}\n\nMessage:\n${submission.message}` } },
      },
      ReplyToAddresses: [submission.email],
    }));
    return response(201, { message: 'Message sent.' });
  } catch (error) {
    console.error('Contact submission failed.', { submissionId, errorName: error?.name });
    return response(500, { message: 'We could not send your message. Please try again later.' });
  }
};
