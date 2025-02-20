import { strapiDataRequestURL } from "./proxyUrl";
export default async function dataRequest(urls, token = '') {
  try {
    const res = await fetch(strapiDataRequestURL, {
      method: "POST",
      body: JSON.stringify({urls}),
    })
    const data = await res.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
}