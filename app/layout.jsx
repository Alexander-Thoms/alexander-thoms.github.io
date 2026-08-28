import "./globals.css";
import { asset } from "../lib/asset";

const fontFace = `
@font-face {
  font-family: "Monaspace Neon";
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url("${asset("/assets/monaspace-neon-400.woff2")}") format("woff2");
}
@font-face {
  font-family: "Monaspace Neon";
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: url("${asset("/assets/monaspace-neon-700.woff2")}") format("woff2");
}
`;

export const metadata = {
  title: "My Personal Website",
  description: "hi, you found my site!",
};

export const viewport = {
  themeColor: "#332486",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: fontFace }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
