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
  description: "A creative developer's portfolio showcasing a blend of design and code, featuring interactive projects that highlight a passion for clean, user-centered digital experiences.",
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
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark') document.documentElement.classList.add('dark');
            } catch(e) {}
          })();
        `}} />
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
