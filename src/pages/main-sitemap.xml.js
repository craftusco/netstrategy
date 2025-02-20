function generateSiteMap(staticPages, dynamicPages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${staticPages
       .map(({url, last_mod}) => {
         return `
      <url>
         <loc>${url}</loc>
         <lastmod>${last_mod}</lastmod>
         <changefreq>daily</changefreq>
         <priority>0.7</priority>
      </url>
    `;
       })
       .join("")}
     ${dynamicPages
       .map(({url, last_mod}) => {
         return `
       <url>
          <loc>${url}</loc>
          <lastmod>${last_mod}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const config = {
    method: "GET",
    headers: {
      Authorization: process.env.ANOTHER_TOKEN,
    },
  };

  //pillars subpillars
  const pillarReq = await fetch(
    `https://www.netstrategy.it/api/pillars?populate=deep&pagination[limit]=-1`,
    config
  );
  const json = await pillarReq.json();
  const pillars = json.data.map((pillar) => {
    return {
      url: `https://www.netstrategy.it/${pillar.attributes.slug}`,
      last_mod: pillar.attributes.updatedAt,
    };
  });

  const subpillars = [];
  pillars.forEach(async ({url: pillarUrl}) => {
    const pillar = pillarUrl.substring(pillarUrl.lastIndexOf("/") + 1);
    const req = await fetch(
      `https://www.netstrategy.it/api/subpillars?populate=deep&pagination[limit]=-1&filters[pillar]=${pillar}`,
      config
    );
    const json = await req.json();
    json.data.forEach((subpillar) => {
      subpillars.push({
        url: `https://www.netstrategy.it/${pillar}/${subpillar.attributes.slug}`,
        last_mod: subpillar.attributes.updatedAt,
      });
    });
  });

  const subpillars2 = [];
  pillars.forEach(async ({url: pillarUrl}) => {
    const pillar = pillarUrl.substring(pillarUrl.lastIndexOf("/") + 1);
    const req = await fetch(
      `https://www.netstrategy.it/api/subpillars-2-0?populate=deep&pagination[limit]=-1&filters[pillar]=${pillar}`,
      config
    );
    const json = await req.json();
    json.data.forEach((subpillar) => {
      subpillars2.push({
        url: `https://www.netstrategy.it/${pillar}/${subpillar.attributes.slug}`,
        last_mod: subpillar.attributes.updatedAt,
      });
    });
  });

  //nettalks
  const talkReq = await fetch(
    `https://www.netstrategy.it/api/talk-details?populate=deep&pagination[limit]=-1`,
    config
  );
  const talkJson = await talkReq.json();
  const nettalks = talkJson.data.map((talk) => {
    return {
      url: `https://www.netstrategy.it/nettalk/${talk.attributes.slug}`,
      last_mod: talk.attributes.updatedAt,
    };
  });

  //successi
  const successiReq = await fetch(
    `https://www.netstrategy.it/api/project-details?populate=deep&pagination[limit]=-1`,
    config
  );
  const successiJson = await successiReq.json();
  // const successi = successiJson.data.map((successo) => {
  //   return {
  //     url: `https://www.netstrategy.it/successi/${successo.attributes.slug}`,
  //     last_mod: successo.attributes.updatedAt,
  //   };
  // });
  const successi = [];

  const dynamicPages = [];
  dynamicPages.push(...pillars, ...subpillars, ...subpillars2, ...nettalks, ...successi);

  const singleTypes = [
    { name: "", api_url: "homepage" }, // ""
    { name: "chi-siamo", api_url: "culture" }, // "chi-siamo"
    { name: "successi", api_url: "project" }, // "successi"
    { name: "nettalk", api_url: "talk" }, // "nettalk"
    { name: "contatti", api_url: "contatti" }, // "contatti"
    { name: "landing-nuove/ecommerce", api_url: "landing-principale" }, // "lp/principale
    {
      name: "author/stefano-robbi",
      api_url: "creators?filters[slug]=stefano-robbi",
    }, // "author/stefano-robbi"
  ];

  const staticPages = await Promise.all(singleTypes.map(async ({ name, api_url }) => {
    const req = await fetch(
      `https://www.netstrategy.it/api/${api_url}`,
      config
    );
    const {data} = await req.json();
    return {
      url: `https://www.netstrategy.it/${name}`,
      last_mod: data.attributes ? data.attributes.updatedAt : data[0].attributes.updatedAt, //api di athor mi torna array, non oggetto, quindi lo gestisco con questo ternario
    };
  }));

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(staticPages, dynamicPages);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
