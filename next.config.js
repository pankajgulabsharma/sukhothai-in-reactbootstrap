module.exports = {
  images: {
    domains: ["d3r8gwkgo0io6y.cloudfront.net", "localhost"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
