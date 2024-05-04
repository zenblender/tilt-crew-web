# 🏓 Tilt Crew 🏓 - Web View

Web app to display players and stats for the [Tilt](https://www.tiltcolorado.com/) Table Tennis League in Louisville, CO.

Stats are pulled in realtime from a Google Sheet where results are calculated.

## Install dependencies

```console
pnpm i
```

## Credentials Setup

Create a `.env.local` file in the form:

```
VITE_GOOGLE_API_KEY=[API-KEY-HERE]
VITE_GOOGLE_SHEET_ID=[SHEET-ID-HERE]
```

The API key is from the steps in the "API Key" section of [these instructions](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

## Running locally

```console
pnpm run dev
```

## Building

```console
pnpm build
```
