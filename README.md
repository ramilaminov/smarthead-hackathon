# SmartHead Hackathon 2020

Built on [Next.js](https://nextjs.org/), [Vercel](https://vercel.com/), and [Cloud Firestore](https://firebase.google.com/products/firestore/).

Uses [NextAuth.js](https://next-auth.js.org/) for authentication, and [SWR](https://swr.vercel.app/) for real-time data fetching.


### Configure local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

    cp .env.local.example .env.local

Populate the .env.local file with your values.


### Start the application

To run your site locally, use:

    npm run dev


To run it it production mode, use:

    npm build
    npm start
