# Welcome to Cook 'n' Collab 🧑‍🍳

A recipe sharing website with sharing, forking, and reviewing features akin to GitHub. It's like a interactive, real time, community cookbook. It is 100% free and open source, written in React, Node.js, and PostgreSQL through Supabase.

Want to show your support? Click the ⭐ at the top of the page.

## Join Community

- Link to the [discord](https://discord.gg/xahMSG5V2M) community.
- Open issues in the GitHub for any bug or feature questions.

## Want to Contribute

If you are interested in contributing, follow these steps to install (will require account on [Supabase](https://supabase.com/))

1. Install Node.js version 20+
2. Clone repository
3. `npm install` in root file of repository
4. Create `.env` file in root
5. Start [new project](https://supabase.com/docs/guides/getting-started) on Supabase
6. Copy **Supabase url** and **anon key** and paste them as two separate string values for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` inside `.env`, respectively
7. Copy all contents in SQL files found in SQL directory into SQL Editor in Supabase

The front end React App is tightly coupled with the Supabase back end, so in order to contribute to the front end you must create a Supabase project. The SQL files will automatically create and populate the tables so that you can work with your own data.

If you have any questions, feel free to email me at [contact@marcoeribes.me](mailto:contact@marcoeribes.me)
