export type FinnAdImage = {
  url: string;
  path: string;
  height?: number;
  width?: number;
  aspect_ratio?: number;
};

export type FinnCoords = {
  lat: number;
  lon: number;
};

export type FinnLabel = {
  id: string;
  text: string;
  type: string;
};

export type FinnPrice = {
  amount: number;
  currency_code: string;
};

export type FinnAdBase = {
  type: string;
  id: string;
  main_search_key: string;
  heading: string;
  location: string;
  image?: FinnAdImage;
  flags: string[];
  timestamp: number;
  coordinates: FinnCoords;
  ad_type: number;
  labels: FinnLabel[];
  canonical_url?: string;
  extras: string[];
  ad_id: number;
};

export type SaleAdNotJobAd = {
  price: FinnPrice;
  timestamp: number;
  image_urls?: string[];
  trade_type: string;
  distance: number;
};

export type FinnAd = FinnAdBase & SaleAdNotJobAd;

export type JobAdNotSaleAd = {
  job_title: string;
  published: number;
  deadline?: number;
  company_name?: string;
  logo?: FinnAdImage;
  no_of_positions?: number;
};

export type FinnJobAd = FinnAdBase & JobAdNotSaleAd;

export type FetchedFinnJobAds = { docs: FinnJobAd[] };

export type AFinnAd = FinnAd | FinnJobAd;

export type FilteredFinnAd = Pick<
  FinnAd,
  "heading" | "location" | "timestamp"
>;

export type MassagedFinnAd = {
  price: number;
  coords: string;
  id: number;
  url: string;
  img: string;
};

export type FilteredAndMassagedFinnAd =
  & FilteredFinnAd
  & MassagedFinnAd;

export type FilteredFinnJobAd = Pick<
  FinnJobAd,
  | "id"
  | "ad_id"
  | "heading"
  | "job_title"
  | "company_name"
  | "location"
  | "published"
  | "deadline"
  | "no_of_positions"
  | "logo"
  | "image"
>;

export type MassagedFinnJobAd = {
  img: string;
  url: string;
};

export type MassagedAndFilteredFinnJobAd =
  & Pick<
    FilteredFinnJobAd,
    | "id"
    | "job_title"
    | "heading"
    | "company_name"
    | "location"
    | "published"
    | "deadline"
    | "no_of_positions"
  >
  & MassagedFinnJobAd;
