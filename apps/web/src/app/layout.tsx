import { Inter } from "next/font/google";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
