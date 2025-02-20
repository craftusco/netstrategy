function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://www.netstrategy.it/blog</loc>
        <lastmod>${posts[0].last_mod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
     ${posts
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
  // We make an API call to gather the URLs for our site
  const req = await fetch(
    `https://www.netstrategy.it/api/journal-details?populate=deep&pagination[limit]=-1`,
    {
      method: "GET",
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
  );
  const json = await req.json();
  const posts = json.data.map((post) => {
    return {url: `https://www.netstrategy.it/${post.attributes.categoria.data.attributes.slug}/${post.attributes.slug}`, last_mod: post.attributes.original_date};
  });

  posts.sort(function(a,b){
    return new Date(b.last_mod) - new Date(a.last_mod);
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
