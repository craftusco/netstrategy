import getPath from "@/utils/getPath";

export default function structuredData(
  url,
  tag_title,
  meta_description,
  updatedAt,
  page
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.netstrategy.it#organization",
        "name": "NetStrategy",
        "url": "https://www.netstrategy.it",
        "sameAs": [
          "https://it-it.facebook.com/NetStrategy.it/",
          "https://it.linkedin.com/company/netstrategy",
          "https://www.youtube.com/channel/UCTNV87nbray-LAe6o_4LwRQ",
          "https://www.instagram.com/netstrategy.agency/"
        ],
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.netstrategy.it#logo",
          "inLanguage": "it-IT",
          "url": "https://www.netstrategy.it/public/logo.svg",
          "contentUrl": "https://www.netstrategy.it/public/logo.svg",
          "width": 218.49,
          "height": 34.652,
          "caption": "NetStrategy"
        },
        "image": {
          "@id": "https://www.netstrategy.it#logo"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "89"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.netstrategy.it#website",
        "url": "https://www.netstrategy.it",
        "name": "NetStrategy",
        "description": "",
        "publisher": {
          "@id": "https://www.netstrategy.it#organization"
        },
        "potentialAction": [],
        "inLanguage": "it-IT"
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": `${url}`,
        "name": `${tag_title}`,
        "isPartOf": {
          "@id": "https://www.netstrategy.it#website"
        },
        "primaryImageOfPage": {
          "@id": `${url}#primaryimage`
        },
        "dateModified": `${updatedAt}`, 
        "description": `${meta_description}`,
        "breadcrumb": {
          "@id": `${url}#breadcrumb`
        },
        "inLanguage": "it-IT",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [`${url}`] 
          }
        ]
      },
      getBreadcrumbs(url, page).length > 0 ? {
        "@type": "BreadcrumbList",
        // "@id": `${url}#breadcrumb`, 
        "itemListElement": getBreadcrumbs(url)
      } : "",
      getVideoData(page) ? getVideoData(page) : ""
    ]
  };
}

//! Get breadcrumbs from the url
function getBreadcrumbs(url, page) {
  // Rimuovi eventuali spazi bianchi all'inizio e alla fine dell'URL
  url = url.trim();

  // Trova la posizione del primo slash dopo il protocollo
  const firstSlashIndex = url.indexOf("/", url.indexOf("://") + 3);

  // Estrai il dominio e il percorso dalla stringa URL
  const domainAndPath = url.slice(firstSlashIndex + 1);

  // Dividi il percorso in base agli slash
  const parts = domainAndPath.split("/").filter((part) => part !== "");

  // Aggiungi il protocollo e il dominio come primo elemento
  parts.unshift(url.slice(0, firstSlashIndex + 1));

  // Aggiungi lo slash finale a tutti gli elementi tranne l'ultimo
  const breadcrumbs = parts.map((part, index) => {
    return index === parts.length - 1 ? part : part;
  });

  let breadcrumbsTemplate = generateBreadcrumbJson(breadcrumbs, page);

  return breadcrumbsTemplate;
}

//! Generate template from breadcrumbs
function generateBreadcrumbJson(breadcrumbs, page) {
  const baseUrl = breadcrumbs[0];
  let breadcrumbArr = [];
  // let breadcrumbArr = [{
  //   "@type": "ListItem",
  //   "position": 1,
  //   "item": `${baseUrl}`
  // }];

  breadcrumbArr.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": 'https://www.netstrategy.it/'
  });

  for (let i = 1; i < breadcrumbs.length; i++) {
    let breadcrumbItem;

    if (i === 1) {
      breadcrumbItem = {
        "@type": "ListItem",
        "position": i + 1,
        "name": breadcrumbs[i].replace('-', ' '),
        "item": `${baseUrl}${breadcrumbs[i]}`
      };
    } else {
      breadcrumbItem = {
        "@type": "ListItem",
        "position": i + 1,
        "name": breadcrumbs[i].replace('-', ' '),
        "item": `${baseUrl}${breadcrumbs[i - 1]}/${breadcrumbs[i]}`
      };
    }

    breadcrumbArr.push(breadcrumbItem);
  }

  // Rimuoviamo la virgola finale
  // breadcrumbString = breadcrumbString.slice(0, -1);

  return breadcrumbArr;
}

function getVideoData(page) {
  if(!page) return;
  const obj = {};
  if(page.slug === "homepage" && page.hasOwnProperty("articolo_blog") && page.articolo_blog.data.attributes.video.data) {
    const data = page.articolo_blog.data.attributes
    if(data.titolo && data.updatedAt && data.meta_thumbnail?.data && data.video.data.attributes.url) {
      obj['@type'] = 'VideoObject';
      if(data.titolo) obj.name = data.titolo;
      if(data.meta_description) obj.description = data.meta_description;
      obj.uploadDate = data.updatedAt;
      obj.contentUrl = getPath(data.video.data.attributes.url);
      if(data.meta_thumbnail?.data) obj.thumbnailUrl = getPath(data.meta_thumbnail?.data.attributes.url); 
    }
  } else if (page.hasOwnProperty("specialist") && page?.specialist.data) {
    const data = page.specialist.data.attributes;
    if(data.meta_name && data.updatedAt && data.meta_thumbnail?.data && data.video.data.attributes.url) { 
      obj['@type'] = 'VideoObject';
      if(data.meta_name) obj.name = data.meta_name;
      if(data.meta_description) obj.description = data.meta_description;
      if(data.meta_duration) obj.meta_duration = data.meta_duration;
      obj.uploadDate = data.updatedAt;
      obj.contentUrl = getPath(data.video.data.attributes.url);
      if(data.meta_thumbnail?.data) obj.thumbnailUrl = getPath(data.meta_thumbnail?.data.attributes.url); 
    }
  } else if (page.hasOwnProperty("video") && page.hasOwnProperty("categoria") && page.video?.data) {
    const data = page
    if(data.titolo && data.video.data.attributes.updatedAt && data.meta_thumbnail?.data && data.video.data.attributes.url) { 
      obj['@type'] = 'VideoObject';
      if(data.titolo) obj.name = data.titolo;
      if(data.meta_description || data.paragrafo) obj.description = data.meta_description ? data.meta_description : data.paragrafo;
      if(data.meta_thumbnail?.data) obj.thumbnailUrl = getPath(data.meta_thumbnail?.data.attributes.url); 
      obj.contentUrl = getPath(data.video.data.attributes.url);
      obj.uploadDate = data.video.data.attributes.updatedAt;
    }
  } else if (page.slug === "nettalk" && page.video_slider) {
    obj['itemListElement'] = [];
    page.video_slider.forEach((video, i) => {
      const vidObj = {}
      if(video.video_meta?.meta_name && video.video.data.attributes.url && video.video.data.attributes.updatedAt && video.video_meta?.meta_thumbnail?.data) {
        vidObj['@type'] = 'VideoObject';
        vidObj['position'] = i + 1;
        vidObj.name = video.video_meta?.meta_name ? video.video_meta?.meta_name : `Video ${i + 1}` ;
        if(video.video_meta?.meta_description) vidObj.description = video.video_meta?.meta_description;
        if(video.video_meta?.meta_duration) vidObj.meta_duration = video.video_meta?.meta_duration;
        if(video.video_meta?.meta_thumbnail?.data) vidObj.thumbnailUrl = getPath(video.video_meta?.meta_thumbnail?.data.attributes.url); 
        vidObj.contentUrl = getPath(video.video.data.attributes.url);
        vidObj.uploadDate = video.video.data.attributes.updatedAt;
        obj['itemListElement'].push(vidObj)
      }
    })
  }
  return Object.keys(obj).length > 0 ? obj : null;
}