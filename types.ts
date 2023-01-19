export interface FinnAd {
  "type": string;
  "ad_id": number;
  "main_search_key": string;
  "heading": string;
  "location": string;
  "flags": string[];
  "timestamp": number;
  "coordinates": {
    "lat": number;
    "lon": number;
  };
  "ad_type": number;
  "labels": string[];
  "logo": {
    "url": string;
    "path": string;
  };
  "job_title": string;
  "deadline": number;
  "published": number;
  "company_name": string;
  "no_of_positions": number;
  "image": {
    "url": number;
    "path": number;
  };
  "ad_link": string;
}
