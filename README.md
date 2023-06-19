## Learn More

This is a web app bootstrapped with [Next.js](https://nextjs.org/) to port any Last.fm users most listened tracks into a Spotify playlist.
It uses the [Last.fm API](https://www.last.fm/api/) to fetch music listening data of any specified user and integrates with [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) to generate playlists on a logged-in Spotify account. The authetication is established via [NextAuth](https://github.com/nextauthjs/next-auth) and I've used [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) for styling. The [live version](https://lastplaylist.vercel.app) is hosted on Vercel.

## How to

There are only a few easy steps to generate playlists on a Spotify account.

If you don't have a Last.fm account to fetch the relevant data, search for one of these usernames, to try it out: Heuxone, Brauzepulver.

1. Login with your Spotify Account
2. Type in a Last.fm username
3. Select a period for the top tracks
4. Hit Submit & Create Spotify Playlist!
