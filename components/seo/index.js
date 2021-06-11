import Head from "next/head";
import PropTypes from "prop-types";

function SEO({
  title,
  description,
  keywords,
  image,
  pageTitle,
  url,
  websiteUrl,
}) {
  const mainTitle = `${title || pageTitle}`;
  const ldJson = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Sukhothai",
    url: "https://sukhothai.in",
    logo: `${websiteUrl}/images/logo.png`,
    sameAs: [
      "https://facebook.com/MySukhoThai",
      "https://twitter.com/mysukhothai",
      "https://www.youtube.com/channel/UCpPdd1kD69uIISwf1IkNqFQ",
      "https://www.instagram.com/mysukhothai/",
    ],
  };

  return (
    <Head>
      <title>{mainTitle}</title>
      <link rel="icon" href="/images/favicon.ico" />
      <meta property="og:title" content={mainTitle} />
      <meta name="twitter:title" content={mainTitle} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sukhothai" />
      <meta name="twitter:creator" content="@sukhothai" />
      <meta property="og:url" content={url} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      <meta name="keywords" content={keywords || ""} />
      {image ? (
        <>
          <meta property="og:image" content={image?.url} />
          <meta property="twitter:image" content={image?.url} />
        </>
      ) : (
        <>
          <meta property="og:image" content={`${websiteUrl}/images/logo.png`} />
          <meta
            property="twitter:image"
            content={`${websiteUrl}/images/logo.png`}
          />
        </>
      )}
      <meta property="og:type" content="website" />
      <link rel="canonical" href={url} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </Head>
  );
}

SEO.defaultProps = {
  description: "",
  keywords: "",
  image: null,
  title: "",
  pageTitle: "",
  url: "",
  websiteUrl: "https://sukhothai.in",
};

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
    ])
  ),
  title: PropTypes.string,
  pageTitle: PropTypes.string,
  url: PropTypes.string,
  websiteUrl: PropTypes.string,
};

export default SEO;
