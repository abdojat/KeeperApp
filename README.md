# KeeperApp

KeeperApp is a lightweight, cross-platform note-taking application built with React and Expo. It provides a simple interface to create, view, and delete notes and demonstrates client-side JWT handling and integration with remote APIs.

This repository contains a hybrid React / React Native (Expo) project that can run on the web, Android, and iOS via Expo.

## Features

- Create, view, and delete notes
- Client-side JSON Web Token (JWT) support for authentication
- Fetches notes from a remote API and posts new notes to that API
- Single codebase for web and mobile using Expo

## Tech stack

- React 18
- Expo / React Native
- Material UI (MUI) for icons and controls
- Axios / fetch for HTTP requests
- JWT for client-side token handling

## Quickstart

Requirements

- Node.js (LTS recommended)
- npm or yarn
- Optional: Android Studio or Xcode for device emulators

Install dependencies

```bash
npm install
```

Run the app (development)

```bash
npm start
# or to open the web build directly:
npm run web
```

Build for production (web)

```bash
npm run build
```

Available scripts (from `package.json`)

- `start` — launch Expo development server
- `web` — open web build via Expo
- `build` — create a web production build (react-scripts)
- `test` — run the Jest test runner
- `lint` — run lint checks
- `reset-project` — reset starter content (utility script)

## Usage

- Open the app in a browser or an Expo client on a device/emulator.
- Register or log in (if backend authentication is configured) to access protected note routes.
- Create notes using the form, view them in the list, and delete notes using the delete control.

## Configuration

The client expects a backend API for storing and retrieving notes. Example endpoints referenced in the code include:

- `https://threebdojapi.onrender.com/notes`
- `https://keeperappapi.onrender.com/`

To use a different backend, update the API endpoints in the client code (for example in `components/Notes.jsx`, `components/CreateArea.jsx`, and `components/Note.tsx`). The client uses URL-encoded payloads in some requests and Bearer tokens for protected routes.

Recommended changes before publishing:

- Replace any hard-coded API URLs with environment-based configuration (for example via `.env` files or a config module).
- Remove or replace any API keys or credentials with secure configuration values.

Authentication notes

- Tokens may be stored in `localStorage` and (in some code paths) cookies.
- The client decodes JWTs to obtain the username for display.
- Ensure secure token handling and implement server-side protections (HTTPS, token expiration, refresh as needed).

## Project structure

- `app/` — Expo app entry and file-based routing (mobile-focused)
- `components/` — main React components (Header, Footer, Notes, Note, CreateArea, etc.)
- `src/` — alternative web-focused components and utilities
- `public/`, `build/`, `static/` — web build output and static assets
- `scripts/` — utility scripts such as `reset-project.js`

Core client files to review

- `components/Notes.jsx` — fetches notes and manages list state
- `components/CreateArea.jsx` — note creation form and POST logic
- `components/Note.tsx` — single note UI and DELETE logic
- `src/components/LoginRegister.jsx` — login and registration UI and token handling

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Commit changes with clear messages.
4. Open a pull request with a description of the change and its motivation.

Guidelines

- Follow the existing code style and patterns.
- Add tests for new or changed behavior where practical.

## Troubleshooting

- If the client cannot reach the API, verify the API URL and that the server supports the expected methods (GET, POST, DELETE).
- For authentication failures, verify stored tokens in `localStorage` and validate the token structure and payload.

## License

This repository does not include a license file. Add a `LICENSE` to specify terms for public use (for example, MIT or Apache 2.0).

## Acknowledgements

- Built with Expo and React
- Uses Material UI icons and components
