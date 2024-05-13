export interface Data<T> {
  props: Props<T>;
}

export interface Props<T> {
  pageProps: T;
}

export interface ResultsPageProps {
  dehydratedState: DehydratedState | null;
}

export interface DehydratedState {
  queries: [Query];
}

export interface Query {
  state: QueryState;
}

export interface QueryState {
  data: QueryData;
}

export interface QueryData {
  count: number;
  maxPages: number;
  currentPage: number;
  results: Result[];
}

export interface Result {
  realEstate: RealEstate;
}

export interface RealEstate<P = Property> {
  id: number;
  uuid: string;
  title: string;
  price: Price;
  contract: string;
  properties: [P];
}

export interface Price {
  value: number;
  formattedValue: string;
}

export interface Property {
  description?: string;
  surface: `${number} m²`;
  multimedia: Multimedia;
  location: Location;
}

export interface Multimedia {
  photos: Photo[];
}

export interface Location {
  latitude: number;
  longitude: number;
  region: string;
  province: string;
  macrozone: string | null;
  microzone: string | null;
  city: string;
  address: string | null;
  streetNumber: string | null;
}

export interface Photo {
  id: number;
  caption: string;
  urls: Record<string, string>;
}

export interface Costs {
  condominiumExpenses:
    | undefined
    | `€ ${number}/mese`
    | "nessuna spesa condominiale";
}

export interface DetailPageProps {
  detailData: DetailData;
}

export interface DetailData {
  realEstate: DetailedRealEstate;
}

export interface DetailedRealEstate extends RealEstate<DetailedProperty> {
  contractValue:
    | "Affitto"
    | "Affitto, transitorio"
    | "Affitto, libero"
    | "Affitto, 4+4"
    | "Affitto, concordato"
    | "Affitto, 3+2"
    | "Affitto, studenti (6-36 mesi)";
}

export interface DetailedProperty extends Property {
  costs: Costs;
}
