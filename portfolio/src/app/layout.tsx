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
