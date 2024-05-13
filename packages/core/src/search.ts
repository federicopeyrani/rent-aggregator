import { getInfo } from "./get-info.ts";
import type { DetailedRealEstate } from "./model/Props.ts";
import { getResults } from "./get-results.ts";
import type { ParsedRealEstate } from "./model/ParsedRealEstate.ts";

const parseSurface = (result: DetailedRealEstate) => {
  const value = result.properties[0]!.surface;

  if (!value) {
    throw new Error("Cannot find surface");
  }

  const match = value.match(/(\d+)/);

  if (!match) {
    throw new Error(`Cannot parse value: ${value}`);
  }

  return parseInt(match[1]!);
};

const parseCondominiumExpenses = (result: DetailedRealEstate) => {
  const value = result.properties[0]!.costs.condominiumExpenses;

  if (!value) {
    return undefined;
  }

  if (value === "nessuna spesa condominiale") {
    return 0;
  }

  const match = value.match(/€ (\d+)/);

  if (!match) {
    throw new Error(`Cannot parse value: ${value}`);
  }

  return parseInt(match[1]!);
};

export const search = async (
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) => {
  console.log("Searching for: ", location, query);

  const results = await getResults(location, query);

  const details = await Promise.all(
    results.map((result) => getInfo(result.realEstate.id)),
  );

  return details.map<ParsedRealEstate>((detail) => ({
    id: detail.id,
    uuid: detail.uuid,
    title: detail.title,
    description: detail.properties[0].description,
    location: detail.properties[0].location,
    photos: detail.properties[0].multimedia.photos,
    url: `https://www.immobiliare.it/annunci/${detail.id}`,
    price: detail.price.value,
    surface: parseSurface(detail),
    condominiumExpenses: parseCondominiumExpenses(detail),
    contract: detail.contractValue,
  }));
};
