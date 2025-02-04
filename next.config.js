/** @type {import('next').NextConfig} */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  images: {
    domains: ["www.gravatar.com"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/auth/register",
        permanent: true,
      },
      {
        source: "/chat",
        destination: "https://discord.gg/rPT8aEWATp",
        permanent: true,
      },
      {
        source: "/community",
        destination: "https://discord.gg/rPT8aEWATp",
        permanent: true,
      },
      {
        source: "/repo",
        destination: "https://github.com/basetool-io/basetool",
        permanent: true,
      },
      {
        source: "/forum",
        destination: "https://github.com/basetool-io/basetool/discussions",
        permanent: true,
      },
      {
        source: "/ideas",
        destination: "https://github.com/basetool-io/basetool/discussions",
        permanent: true,
      },
    ];
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

if (process.env.ANALYZE) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });

  module.exports = withBundleAnalyzer(moduleExports);
} else if (process.env.BASE_URL && process.env.BASE_URL.includes("localhost")) {
  module.exports = moduleExports;
} else if (process.env.BUILDING_IN_DOCKER === '1') {
  // Removing sentry if we're building in docker
  module.exports = moduleExports;
} else {
  // Make sure adding Sentry options is the last code to run before exporting, to
  // ensure that your source maps include changes from all other Webpack plugins
  module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
}
