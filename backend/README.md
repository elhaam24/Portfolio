# Portfolio Contact Backend

This directory is intentionally independent from the React app. It deploys a `POST /contact` API with AWS SAM:

- API Gateway HTTP API accepts browser requests only from the configured Amplify production origin and local Vite origin.
- Lambda validates and normalizes the request, stores it in DynamoDB, then sends an SES notification.
- DynamoDB is on-demand, encrypted, and point-in-time recovery is enabled.
- The Lambda role can only write to this table, send from the configured SES identity, and write its logs. No AWS keys are used by or shipped to the frontend.

## Prerequisites

Install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) and configure AWS credentials locally through an AWS profile, SSO, or an IAM role. The deploy credentials are never frontend credentials.

Before deploying, verify the SES sender identity you will use. In an SES sandbox account, the notification recipient must also be verified; request production access before using arbitrary recipients.

## Deploy

From this `backend` directory, run:

```bash
sam build
sam deploy --guided
```

During the guided deployment provide:

- `ProductionOrigin`: the exact Amplify URL, such as `https://main.d1234567890.amplifyapp.com`, with no trailing slash.
- `DevelopmentOrigin`: normally `http://localhost:5173`.
- `NotificationFromEmail`: an SES-verified sender address.
- `NotificationToEmail`: the mailbox that receives notifications.
- `SesVerifiedIdentity`: the verified SES email address or domain authorizing the sender.

The stack output `ContactApiUrl` is the complete `/contact` endpoint. CORS must use exact origins; if you later attach a custom Amplify domain, update `ProductionOrigin` and redeploy.

## Connect Amplify and local Vite

1. Copy the root `.env.example` to `.env.local` and set `VITE_CONTACT_API_URL` to the `ContactApiUrl` output for local development.
2. In Amplify Hosting, add a build environment variable named `VITE_CONTACT_API_URL` with the same output value, then redeploy the frontend.

Values beginning with `VITE_` are embedded in the browser build. The API URL is safe to expose; never put `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, SES SMTP credentials, or other AWS secrets in Amplify frontend variables.

## Request contract

`POST /contact` accepts JSON:

```json
{ "name": "Ada Lovelace", "email": "ada@example.com", "subject": "Project idea", "message": "Hello" }
```

All fields are required. The backend independently validates lengths and email format, so client-side validation is not a security boundary.

## Operational notes

The function stores a valid submission before sending the email. If SES is temporarily unavailable, the submission remains in DynamoDB and the API returns an error. Use DynamoDB records to retry or investigate failed notifications; Lambda logs deliberately exclude contact message content.
