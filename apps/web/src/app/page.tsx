"use client";

import { Group, Input, InputWrapper, MultiSelect, Stack } from "@mantine/core";
import { Results } from "@/app/results";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [contracts, setContracts] = useState<string[]>([]);

  return (
    <Stack gap={"md"} py={"xl"} px={"xl"}>
      <Group>
        <InputWrapper label={"URL"}>
          <Input
            placeholder={"Paste a search URL"}
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
          />
        </InputWrapper>

        <MultiSelect
          data={["1", "2", "3"]}
          label="Contract"
          value={contracts}
          onChange={setContracts}
        />
      </Group>

      <Results url={url} contracts={contracts} />
    </Stack>
  );
}
