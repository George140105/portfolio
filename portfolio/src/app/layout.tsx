import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ModalProvider } from "~/providers/ModalProvider";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "George Amgad – Software Engineer",
  description:
    "Final-year Computer Science student at GUC building mobile apps, ML models and data pipelines.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#11100e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="bg-background font-sans text-foreground transition-colors duration-300">
        <div className="ambient" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        {/* Shown by the server-rendered HTML until the app hydrates; see .boot-skeleton in globals.css */}
        <div className="boot-skeleton" aria-hidden>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-28 sm:px-6 md:grid-cols-[1.25fr_0.75fr] md:pt-36">
            <div className="space-y-5">
              <div className="skeleton h-4 w-48 rounded-full" />
              <div className="skeleton h-20 w-4/5 rounded-2xl sm:h-28" />
              <div className="skeleton h-20 w-3/5 rounded-2xl sm:h-28" />
              <div className="skeleton h-8 w-72 max-w-full rounded-full" />
              <div className="space-y-2 pt-2">
                <div className="skeleton h-4 w-full max-w-xl rounded-full" />
                <div className="skeleton h-4 w-11/12 max-w-xl rounded-full" />
                <div className="skeleton h-4 w-2/3 max-w-xl rounded-full" />
              </div>
            </div>
            <div className="skeleton order-first aspect-square w-36 rounded-2xl sm:w-44 md:order-last md:aspect-[4/5] md:w-full md:rounded-[1.75rem]" />
          </div>
        </div>
        <noscript>
          <style>{`.boot-skeleton{display:none}`}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
