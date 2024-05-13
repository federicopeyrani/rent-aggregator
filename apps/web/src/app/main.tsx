"use client";

import { PropsWithChildren } from "react";
import { AppShell, Button, Group } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Main: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AppShell padding="xl">
      <AppShell.Header pos={"sticky"}>
        <Group px="xl" py="xs">
          <Link href="/search">
            <Button variant={pathname === "/search" ? "light" : "subtle"}>
              Search
            </Button>
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
