# Elham Portfolio

A frontend-only React portfolio built with Vite, TypeScript, Tailwind CSS, React Router, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## AWS Amplify Hosting

Amplify detects this as a Vite app. Use these build settings if prompted:

```yaml
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

For client-side route refreshes, configure a rewrite from `/<*>` to `/index.html` with status `200` in the Amplify console.
