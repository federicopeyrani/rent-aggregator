"use client";

import { ParsedRealEstate } from "core";
import { Button, Card, Image, NavLink, SimpleGrid, Text } from "@mantine/core";

export interface ResultCardProps {
  result: ParsedRealEstate;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => (
  <Card shadow={"sm"} padding={"md"} h={512 + 64}>
    <Card.Section>
      <Image src={result.photos[0]?.urls.small} h={192} />
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
        label={result.location.macrozone ?? result.location.city}
        description={result.location.microzone ?? result.location.address}
        target="_blank"
      />
    </Card.Section>

    <Text size="sm" mt="sm">
      {result.surface} m²
    </Text>

    <Text size="sm" mt="sm">
      {result.contract}
    </Text>

    {result.title && (
      <Text flex={1} size="xs" mt="sm" c="dimmed">
        {result.title}
      </Text>
    )}

    <Card.Section inheritPadding mt="sm">
      <SimpleGrid cols={3}>
        {result.photos
          .filter((_, index) => index > 0 && index <= 3)
          .map((image) => (
            <Image key={image.id} src={image.urls.thumb} radius="sm" />
          ))}
      </SimpleGrid>
    </Card.Section>

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
