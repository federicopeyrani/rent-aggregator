import type { Data, ResultsPageProps } from "./model/Props";

export const getResultsRaw = async (
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) => {
  const url = `https://www.immobiliare.it/affitto-case/${location}/?${new URLSearchParams(
    query,
  ).toString()}`;

  const data = await fetch(url, { cache: "no-store" }).then((response) =>
    response.text(),
  );

  // find the JSON data that inside the `<script id="__NEXT_DATA__" type="application/json">` tag
  const json = data.match(
    /<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/,
  );

  if (!json || !json[1]) {
    throw new Error("Cannot find JSON data");
  }

  const { props } = JSON.parse(json[1]) as Data<ResultsPageProps>;

  if (!props.pageProps.dehydratedState) {
    throw new Error("Cannot find dehydrated state");
  }

  return props.pageProps.dehydratedState.queries[0].state.data;
};
