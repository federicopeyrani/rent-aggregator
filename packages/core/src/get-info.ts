import type { Data, DetailPageProps, ResultsPageProps } from "./model/Props.ts";

export const getInfo = async (id: number) => {
  const page = await fetch(`https://www.immobiliare.it/annunci/${id}`).then(
    (response) => response.text(),
  );

  const json = page.match(
    /<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/,
  );

  if (!json || !json[1]) {
    throw new Error("Cannot find JSON data");
  }

  const { props } = JSON.parse(json[1]) as Data<DetailPageProps>;

  return props.pageProps.detailData.realEstate;
};
