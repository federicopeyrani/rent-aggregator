import { Inter } from "next/font/google";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import { Main } from "@/app/main";
import { Metadata } from "next";
import { theme } from "@/app/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent Aggregator",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Main>{children}</Main>
        </MantineProvider>
      </body>
    </html>
  );
}
