import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";



const body = localFont({
  src: "./fonts/Urbanist-VariableFont_wght.ttf",
  variable: "--font-body",
});
const display = localFont({
  src: "./fonts/Shanolia.ttf",
  variable: "--font-display",
});


export const metadata: Metadata = {
  title: "Faith-Portfolio",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
