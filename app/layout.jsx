import "./globals.css";

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
      </head>
      <body>{children}</body>
    </html>
  );
}
