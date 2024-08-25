# Event App

## Main idea
This is an event app I am building for Voyage de la Lune. The problem this app solves is events information generally being quite unorganized especially when things change. This app is a way for participants and organizers to better connect and spread information.

I saw an app like this originally at BMES 2023 conference where they built a kinda bad app but it conveyed information. I hope this app can do that but better!
### Event page
![Event page](https://cloud-gtbf7484u-hack-club-bot.vercel.app/0image.png)
### Activity Page
![Activity page](https://cloud-mf1bvziif-hack-club-bot.vercel.app/0image.png)
## Technologies
- Next.js
- Prisma.js
- Cockroachdb (although this should be easy to switch)c
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

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
