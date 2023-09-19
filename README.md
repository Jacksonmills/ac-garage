# Armored Core Garage - Mech Building Assistant

Welcome to Armored Core Garage (ACG), a TypeScript based web application developed to assist Armored Core players in building their custom mechs. This project leverages the power of advanced AI, OpenAI's GPT-4, to guide users interactively through the process, offering real-time stats and tailored advice. Users can ask questions and interact with the AI via an engaging chat interface. The AI is context-aware and can fetch relevant data from a comprehensive database of mech parts based on the user's queries.

## Table of Contents

- [Armored Core Garage - Mech Building Assistant](#armored-core-garage---mech-building-assistant)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Deployment](#deployment)

## Features

- AI-powered, user-friendly chat interface for building your mech
- Real-time calculations of stats, including armor points
- Comprehensive and interactive database of mech parts
- Reactive UI that enhances the user experience
- Utilizes technologies such as TypeScript, Next.js, Tailwind CSS, Drizzle ORM, PlanetScale's MySQL database, and OpenAI Edge, enhanced with user interface libraries like Radix UI and Clerk for user authentication

## Setup

First, install the dependencies:

```bash
pnpm install
```

To run the development server:

```bash
pnpm run dev
```

Connect to planetscale db:

```bash
pscale connect <database-name>
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

Start by selecting the parts for your mech. The AI will guide you through the process and update the stats in real-time. Use the chat interface to ask questions and get personalized advice based on your build.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/<your-github-username>/armored-core-garage/issues) for open issues or create a new one.

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). To learn more about Next.js, take a look at [Next.js Documentation](https://nextjs.org/docs).

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), created by the developers of Next.js.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
