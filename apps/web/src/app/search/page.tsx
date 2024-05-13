"use client";

import { Button, Input, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const url = new FormData(event.currentTarget).get("url") as string;
        const urlObject = new URL(url);
        const city = urlObject.pathname.split("/")[2];

        const params = new URLSearchParams(urlObject.search);
        params.set("city", city);

        router.push(`/search/query?${params.toString()}`);
      }}
    >
      <Stack justify={"center"} align={"center"} h={"100vh"}>
        <Input
          type={"url"}
          name={"url"}
          placeholder={"Paste a search URL\u2026"}
        />

        <Button type="submit">Search</Button>
      </Stack>
    </form>
  );
}
