"use client";

import { ParsedRealEstate } from "core";
import {
  Box,
  Button,
  Card,
  Image,
  NavLink,
  Pill,
  SimpleGrid,
  Spoiler,
  Text,
} from "@mantine/core";

export interface ResultCardProps {
  result: ParsedRealEstate;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => (
  <Card key={result.id} shadow={"sm"} padding={"md"}>
    <Card.Section>
      <Image src={result.photos[0]?.urls.medium} h={192} />
    </Card.Section>

    <Card.Section inheritPadding mt="sm">
      <SimpleGrid cols={3}>
        {result.photos
          .filter((_, index) => index > 0 && index <= 3)
          .map((image) => (
            <Image key={image.id} src={image.urls.small} radius="sm" />
          ))}
      </SimpleGrid>
    </Card.Section>

    <Text size="lg" mt="sm" fw={600}>
      {result.condominiumExpenses === undefined ||
      result.condominiumExpenses > 0 ? (
        <>
          <Text component="span" c="dimmed">
            {`${result.price} + ${result.condominiumExpenses ?? "?"} = `}
          </Text>
          {result.price + (result.condominiumExpenses ?? 0)}
        </>
      ) : (
        result.price
      )}{" "}
      €
    </Text>

    <Card.Section withBorder mt="sm">
      <NavLink
        px="md"
        href={`https://www.google.com/maps/search/?api=1&query=${result.location.latitude},${result.location.longitude}`}
        label={result.location.macrozone}
        target="_blank"
      />
    </Card.Section>

    <Text size="sm" mt="sm">
      {[result.contract, `${result.surface} m² `]
        .filter(Boolean)
        .join(" \u00b7 ")}
    </Text>

    <Text size="sm" mt="sm" c="dimmed">
      {result.title}
    </Text>

    {result.description && (
      <Text size="xs" mt="sm" c="dimmed">
        <Spoiler maxHeight={80} showLabel="More" hideLabel="Less">
          {result.description}
        </Spoiler>
      </Text>
    )}

    <Box flex={1} />

    <Button
      mt="sm"
      onClick={() => {
        window.open(result.url, "_blank");
      }}
    >
      View
    </Button>
  </Card>
);
