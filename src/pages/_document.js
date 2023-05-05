import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        {/* <NextScript > */}
        <NextScript src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></NextScript>
        {/* </NextScript> */}
      </body>
    </Html>
  )
}
