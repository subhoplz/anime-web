# AniRelease Notifier

This is a NextJS starter in Firebase Studio.

## Deployment

This application is designed to be deployed on Cloudflare Pages. 

### Prerequisites

- A Cloudflare account.
- The `wrangler` CLI tool installed (`npm install -g wrangler`).
- A GitHub repository for your project.

### Deployment Steps

1.  **Connect your GitHub repository to Cloudflare Pages:**
    -   Log in to your Cloudflare account.
    -   Navigate to Pages and click "Create a project".
    -   Connect to your GitHub repository.

2.  **Configure the build settings:**
    -   Framework preset: `Next.js`
    -   Build command: `next build`
    -   Build output directory: `.next`

3.  **Set environment variables:**
    - Add GOOGLE_GENAI_API_KEY to your Cloudflare Pages environment variables.

4.  **Deploy:**
    -   Cloudflare Pages will automatically build and deploy your application whenever you push changes to your GitHub repository.

### Local Development

To get started with local development:

1.  Install dependencies: `npm install`
2.  Run the development server: `npm run dev`

The application will be available at `http://localhost:9002`.
# anime-web
