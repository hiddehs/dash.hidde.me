# 🎛 dash.hidde.me


## Configuration
dash.hidde.me can be configured by using environment variables (`cp .env.example .env`)
Where env variable `AUTH` is used for the 2-week-valid-authorization of the dashboard.

The statistics can be configured by copying the config.example.json (`cp config.example.json config.json`) and filling it with your server' hostnames, Prometheus DataSource-id's (ds) and Grafana API Tokens.

`TODO: Add configuration description` 

## Routing

| Route | Description |
| --- | --- |
| `/` | Home page with login button |
| `/tv` | TV page where Spotify authorization is automatically redirected. Click on header/footer to fullscreen. |

## Development

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
