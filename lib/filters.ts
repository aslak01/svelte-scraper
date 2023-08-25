import type { FinnJobAd, MassagedAndFilteredFinnJobAd } from "./types.ts";

export const adFilter = (ad: FinnJobAd): MassagedAndFilteredFinnJobAd => {
  const {
    id,
    ad_id,
    heading,
    job_title,
    company_name,
    location,
    published,
    deadline,
    no_of_positions,
    logo,
    image,
  } = ad;

  const parsedId = String(ad_id) || String(id);
  const url = "https://www.finn.no/job/fulltime/ad.html?finnkode=" + parsedId;
  const img1 = logo?.url || "";
  const img2 = image?.url || "";

  const img = img1 || img2 || "";

  console.log(parsedId, heading, company_name, job_title);

  return {
    id: parsedId,
    heading,
    job_title,
    company_name,
    location,
    no_of_positions,
    published,
    deadline,
    url,
    img,
  };
};
