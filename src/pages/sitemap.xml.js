function generateSiteMap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>https://www.netstrategy.it/main-sitemap.xml</loc></sitemap>
    <sitemap><loc>https://www.netstrategy.it/blog-sitemap.xml</loc></sitemap>
    <sitemap><loc>https://www.netstrategy.it/video-sitemap.xml</loc></sitemap>
    </sitemapindex>
   `;
  }
  
  function SiteMap() {
    // getServerSideProps will do the heavy lifting
  }
  
  export async function getServerSideProps({ res }) {
    const sitemap = generateSiteMap();
  
    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();
  
    return {
      props: {},
    };
  }
  
  export default SiteMap;