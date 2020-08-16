import '../css/app.scss'
import Head from 'next/head'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>dash.hidde.me</title>
      </Head>
      <Component className={'mt-20'} {...pageProps} />
    </>
  )
}
