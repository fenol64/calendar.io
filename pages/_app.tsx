import type { AppProps } from 'next/app'
import Head from 'next/head'
import '/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <Head>
      <title>Calendar.io</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></link>
      <link href="https://fonts.googleapis.com/css2?family=Holtwood+One+SC&family=Titan+One&display=swap" rel="stylesheet" />
      {/* font awesome cdn */}
      <link href="https://pro.fontawesome.com/releases/v6.0.0-beta3/css/all.css" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  </div>
}
