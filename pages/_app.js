import Head from "next/head";
import PropTypes from "prop-types";
import Layout from "../components/layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/App.scss";

function SukhoThai({ Component, pageProps }) {
  return (
    <Layout pageProps={pageProps}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

SukhoThai.getInitialProps = async () => {
  const res = await fetch(
    "http://login.sukhothai.in/route/schema_wrapper/getDataByCollectionName/websiteHeaderMenu"
  );
  const response = await res.json();
  return {
    pageProps: response,
  };
};

SukhoThai.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default SukhoThai;
