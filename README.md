# shrirambalaji.com

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: Markdown using [MDX](https://mdxjs.com/) and [Next-MDX-Remote](https://github.com/hashicorp/next-mdx-remote)

## Overview

- `util/*` - helpful utilities or code for external services.
- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction) powering /opengraph endpoint.
- `content/*` - Markdown / MDX content powering the site.
- `pages/*` - All other static pages.
- `public/*` - Static assets including fonts and images.
- `styles/*` - Some global styles.

## Running Locally

This application requires Node.js v16.13+.

```bash
$ git clone https://github.com/shrirambalaji/shrirambalaji.com.git
$ cd shrirambalaji.com
$ pnpm
$ pnpm dev
```

## Inspiration

The revamp of my portfolio is heavily inspired by [leerob.io](https://leerob.io), [sreetamdas.com](https://sreetamdas.com) and many others.
