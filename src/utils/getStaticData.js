import dataRequest from "./dataRequest";

/**
 * Prende i dati statici che servono in tutte le pagine
 *
 * @param {boolean} isHome Mettere true se si vogliono prendere i dati della home, altrimenti false o non specificare per le altre pagine
 * @return {array}
 */
export default async function getStaticData(isHome = false) {
  let url = `https://www.netstrategy.it/api/resource?populate[footer][populate][0]=certificazioni,indirizzi&populate[terms][populate][0]=*&populate[social][populate][0]=*&populate[contact][populate][0]=*`
  if(isHome) url += `&populate[obbiettivi][populate][list][populate][0]=immagine`
  let urls = [
    {
      name: 'resource',
      url
    },
  ];

  const data = await dataRequest(urls);
  
  return await data ?  data.resource.attributes : [];
}
