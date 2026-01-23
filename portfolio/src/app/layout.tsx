import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "~/components/Footer";
import ThemeToggle from "~/components/ThemeToggle";
import { ModalProvider } from "~/providers/ModalProvider";

export const metadata = {
  title: "George Amgad - Portfolio",
  description: "Software Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical videos */}
        <link
          rel="preload"
          href="/homebase_preview.mp4"
          as="video"
          type="video/mp4"
        />
        <link rel="preload" href="/helper.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/goe.mp4" as="video" type="video/mp4" />
        <link
          rel="preload"
          href="/os_project.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/tictactoe(1).mp4"
          as="video"
          type="video/mp4"
        />
        <link rel="preload" href="/Connect 4.mp4" as="video" type="video/mp4" />
        <link
          rel="preload"
          href="/Flappy Bird.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/Attack on Titan.mp4"
          as="video"
          type="video/mp4"
        />
        <link rel="preload" href="/scad.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/helper1.mp4" as="video" type="video/mp4" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = window.localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className="transition-colors bg-background duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ModalProvider>
            <div className="min-h-screen w-full bg-background text-foreground relative">
              {children}
              <ThemeToggle />
            </div>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
