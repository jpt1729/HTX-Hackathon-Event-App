This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Event App

This is an event app I am building for Voyage de la Lune. The problem this app solves is events information generally being quite unorganized especially when things change. This app is a way for participants and organizers to better connect and spread information.

Isaw an app like this originally at BMES 2023 conference where they built a kinda bad app but it conveyed information well. I hope this app can do that but better!

## Features

Events:
Events are the parent of activities. Organizers can put a intro markdown and from that they can build out further what they want to do. They can write a general summary and add helpful info and create activities

Activities:
These are interactive and are part of events. Participants can click on activities and answer questions live and answer Q and As and just get general information

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

env template
```js
DATABASE_URL="" // Postgres URL
AUTH_SECRET="" // Next Auth Secret

AUTH_GITHUB_ID="" // Github auth ID
AUTH_GITHUB_SECRET="" // Github auth secret
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
