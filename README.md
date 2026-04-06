# AI Chat Wrapper

AI Chat Wrapper is a React and Vite single-page chat application that sends prompts to OpenAI and renders the conversation in a ChatGPT-style interface. The app includes a fixed navbar, a prompt history sidebar, markdown rendering for model responses, and a lightweight rate limit on submissions.

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- Material UI
- OpenAI JavaScript SDK
- React Markdown

## Project Layout

The actual web app lives in the `workspace` directory.

```text
ai-chat-wrapper/
├── Dockerfile
├── README.md
└── workspace/
	├── package.json
	├── src/
	│   ├── App.tsx
	│   ├── main.tsx
	│   └── components/
	│       ├── Footer.tsx
	│       ├── History.tsx
	│       ├── Message.tsx
	│       ├── Navbar.tsx
	│       └── Output.tsx
	└── public/
```

## How It Works

- `App.tsx` holds the conversation state and routes data to the main chat area and the history sidebar.
- `Output.tsx` handles prompt submission, OpenAI API requests, markdown rendering, auto-scroll, and the cooldown logic.
- `History.tsx` displays saved user prompts and supports single-delete and clear-all actions.
- `Message.tsx` renders each history entry.
- `Navbar.tsx` provides the fixed top navigation layout.
- `Footer.tsx` currently renders a simple author credit.

## Local Development

Run the app from the `workspace` folder.

```bash
cd workspace
npm install
npm run dev
```

Vite will start the development server and print the local URL in the terminal.

## Available Scripts

From `workspace/`:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Environment Variables

Create a `.env` file inside `workspace/` and add your OpenAI key:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

This app currently reads the key in the browser through Vite environment variables.

## Security Notes

The current implementation works for prototyping, but it is not production-safe yet.

- The OpenAI client is initialized in the browser with `dangerouslyAllowBrowser: true`
- That means your API key is exposed to the client
- Markdown links are filtered through a safe URL transform
- Raw HTML is not enabled in markdown rendering

For production use, move OpenAI calls to a backend service or API route and keep the API key server-side.

## Dockerizing the App
This repository also has a Dockerfile at the root which is a base dockerfile for Node version 24. By customizing the app startup commands in the dockerfile, you can automatically run the app at port 8080.

## Author

Baldwin-Akin Varner

## Credits
The code for this repository was AI assisted using VS Code's ChatGPT integration.

The images in the /public/OpenAI-Logos-2025 folder belong to OpenAI