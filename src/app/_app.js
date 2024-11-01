import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'; // Import Head from next/head

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Add Font Awesome CDN link */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-LI6cFMSFZK/CwOV07q0ENJY3KuRxQnT4KLUjB8nZhuHTkZB6InbXh3vG5Ojbyxr0mWyn96yT0AHsydhIS2PbWg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
