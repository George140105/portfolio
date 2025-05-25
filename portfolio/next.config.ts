import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export
  // optional: if deploying to GitHub Pages
  basePath: "/portfolio",
  trailingSlash: true,
};

module.exports = nextConfig;
