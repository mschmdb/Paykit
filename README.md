# PAYKIT - SvelteKit Payload CMS Frontend

This repository contains a SvelteKit application that serves as a frontend for Payload CMS v3. It provides dynamic site routes and a blog, creating a flexible and powerful web application.

> [!IMPORTANT]
> Still work in progress, but if you know how to set up payload & how to do some changes in Svelte you should be good.

## Features

- Built with SvelteKit for fast, efficient frontend development
- Integrates seamlessly with Payload CMS v3 for content management
- Dynamic site routes for flexible page creation
- Blog functionality
- Internationalization (i18n) support using [Paraglide](https://inlang.com/m/dxnzrydw/paraglide-sveltekit-i18n)
- Type-safe API calls with [tRPC](trpc.io)
- Incremental Static Regeneration ([ISR](https://vercel.com/docs/incremental-static-regeneration)) for improved performance
- Server-side rendering (SSR) capabilities

### Todos

- still some work needs to go into SEO (i.e. Blog route is not covered pretty good)
- automatic Sitemap.xml generation
- automatic ISR Cache regeneration on Content changes from payload

## Implementation Guide

To set up and run this project, follow these steps:

1. Set up Payload CMS:
   - **Use the "website" template when initializing Payload CMS**
   - If needed, localize all Payload collections (refer to Payload documentation for details)
   - For best practices, run Payload locally and use database migrations for remote deployment
   - Consult the [Payload CMS documentation](https://payloadcms.com/docs/getting-started/installation) for detailed setup instructions

2. Clone this repository and install dependencies:

```
git clone https://github.com/mschmdb/Paykit
cd Paykit
pnpm install
```
 

3. Set up your environment variables:
- Rename the `.env.example` file to `.env`
- Open the `.env` file and update the values as needed for your specific setup


4. Start the development server:

```
pnpm dev
```
 


 


 

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

