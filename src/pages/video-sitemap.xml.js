function generateSiteMap(videos) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <!--We manually set the two URLs we know already-->
     ${videos
       .map((video) => {
        const videoList =  video.list.filter(({ title, desc }) => title && desc);
         return videoList.length > 0
           ? `
         <url>
         <loc>${video.loc}</loc>
         ${videoList.map(({ title, desc, loc, dur, thumb }) => {
           let string = `<video:video>\n`;
           string += thumb
             ? `<video:thumbnail_loc>${thumb}</video:thumbnail_loc>\n`
             : "";
           string += title ? `<video:title>${title}</video:title>\n` : "";
           string += desc
             ? `<video:description>\n
          ${desc}\n
      </video:description>\n`
             : "";
           string += loc
             ? `<video:content_loc>${loc}</video:content_loc>\n`
             : "";
           string += dur ? `<video:duration>${dur}</video:duration>\n` : "";
           string += `</video:video>\n`;

           return title && desc ? string : null;
         }).join("")}
     </url>
     `
           : '';
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const videos = [];
  const config = {
    method: "GET",
    headers: {
      Authorization: process.env.ANOTHER_TOKEN,
    },
  };

  //video in subpillars
  const req = await fetch(
    `https://www.netstrategy.it/api/subpillars?populate=deep&pagination[limit]=-1&filters[specialist][nome_video][$null]`,
    config
  );
  const json = await req.json();
  json.data.forEach((subpillar) => {
    if (!subpillar.attributes.specialist.data) return;
    const specialist = subpillar.attributes.specialist.data.attributes;
    videos.push({
      loc: `https://www.netstrategy.it/${subpillar.attributes.pillar}/${subpillar.attributes.slug}`,
      list: [
        {
          title: specialist.meta_name
            ? specialist.meta_name
            : specialist.nome_video,
          desc: specialist.meta_description,
          dur: specialist.meta_duration,
          thumb: specialist.meta_thumbnail.data
            ? `https://www.netstrategy.it${specialist.meta_thumbnail.data.attributes.url}`
            : null,
          loc: `https://www.netstrategy.it${specialist.video.data.attributes.url}`,
        },
      ],
    });
  });

  //video home (hero e video articolo)
  const reqHome = await fetch(
    `https://www.netstrategy.it/api/homepage?populate=deep&pagination[limit]=-1`,
    config
  );
  const jsonHome = await reqHome.json();
  const homeStaticList = [
    {
      title: jsonHome.data.attributes.tag_title,
      desc: jsonHome.data.attributes.meta_description,
      dur: jsonHome.data.attributes.meta_duration,
      thumb: jsonHome.data.attributes.hero.video_meta_thumbnail.data
        ? `https://www.netstrategy.it${jsonHome.data.attributes.hero.video_meta_thumbnail.data.attributes.url}`
        : null,
      loc: `https://www.netstrategy.it${jsonHome.data.attributes.hero.video.data.attributes.url}`,
    },
  ];
  if (jsonHome.data.attributes.articolo_blog.data.attributes.video.data) {
    homeStaticList.push({
      title: jsonHome.data.attributes.articolo_blog.data.attributes.tag_title,
      desc: jsonHome.data.attributes.articolo_blog.data.attributes
        .meta_description,
      dur: jsonHome.data.attributes.articolo_blog.data.attributes.meta_duration,
      thumb: jsonHome.data.attributes.articolo_blog.data.attributes
        .meta_thumbnail.data
        ? `https://www.netstrategy.it${jsonHome.data.attributes.articolo_blog.data.attributes.meta_thumbnail.data.attributes.url}`
        : null,
      loc: `https://www.netstrategy.it${jsonHome.data.attributes.articolo_blog.data.attributes.video.data.attributes.url}`,
    });
  }
  videos.push({
    loc: `https://www.netstrategy.it`,
    list: homeStaticList,
  });

  //video nettalk (hero e intervista post nettalk)
  const reqTalk = await fetch(
    `https://www.netstrategy.it/api/talk?populate=deep&pagination[limit]=-1`,
    config
  );
  const jsonTalk = await reqTalk.json();
  const videoTalkList = [
    {
      title: jsonTalk.data.attributes.tag_title,
      desc: jsonTalk.data.attributes.meta_description,
      dur: jsonTalk.data.attributes.hero.meta_duration,
      thumb: jsonTalk.data.attributes.hero.video_meta_thumbnail.data
        ? `https://www.netstrategy.it${jsonTalk.data.attributes.hero.video_meta_thumbnail.data.attributes.url}`
        : null,
      loc: `https://www.netstrategy.it${jsonTalk.data.attributes.hero.video.data.attributes.url}`,
    },
  ];

  jsonTalk.data.attributes.video_slider.forEach((slide) => {
    videoTalkList.push({
      title: slide.video_meta.meta_name,
      desc: slide.video_meta.meta_description,
      dur: slide.video_meta.meta_duration,
      thumb:
        slide.video_meta.meta_thumbnail && slide.video_meta.meta_thumbnail?.data
          ? `https://www.netstrategy.it${slide.video_meta.meta_thumbnail.data.attributes.url}`
          : null,
      loc: `https://www.netstrategy.it${slide.video.data.attributes.url}`,
    });
  });
  videos.push({
    loc: `https://www.netstrategy.it/nettalk`,
    list: videoTalkList,
  });

  //video successi dettaglio website, video intervista, render
  const reqSuccessi = await fetch(
    `https://www.netstrategy.it/api/project-details?populate=deep&pagination[limit]=-1`,
    config
  );
  const jsonSuccessi = await reqSuccessi.json();
  jsonSuccessi.data.forEach((successo) => {
    const successoVideoList = [];
    //se c'è website
    if (successo.attributes.website) {
      //lista video singolo
      if (successo.attributes.website.video_singolo) {
        successo.attributes.website.video_singolo.forEach((video) => {
          if (!video.video || video.video?.data?.attributes?.ext != ".mp4")
            return;
          successoVideoList.push({
            title: video.meta_name,
            desc: video.meta_description,
            dur: video.meta_duration,
            thumb: video.meta_thumbnail.data
              ? `https://www.netstrategy.it${video.meta_thumbnail.data.attributes.url}`
              : null,
            loc: `https://www.netstrategy.it${video.video.data.attributes.url}`,
          });
        });
      }
      if (successo.attributes.website.video_multiplo) {
        //lista video multiplo
        successo.attributes.website.video_multiplo.forEach((video) => {
          if (
            !video.video_desktop ||
            video.video_desktop?.data?.attributes?.ext != ".mp4"
          )
            return;
          successoVideoList.push({
            title: video.meta_name,
            desc: video.meta_description,
            dur: video.meta_duration,
            thumb: video.meta_thumbnail.data
              ? `https://www.netstrategy.it${video.meta_thumbnail.data.attributes.url}`
              : null,
            loc: `https://www.netstrategy.it${video.video_desktop.data.attributes.url}`,
          });
          if (
            !video.video_mobile ||
            video.video_mobile?.data?.attributes?.ext != ".mp4"
          )
            return;
          successoVideoList.push({
            title: video.meta_name,
            desc: video.meta_description,
            dur: video.meta_duration,
            thumb: video.meta_thumbnail.data
              ? `https://www.netstrategy.it${video.meta_thumbnail.data.attributes.url}`
              : null,
            loc: `https://www.netstrategy.it${video.video_mobile.data.attributes.url}`,
          });
        });
      }
    }

    //render_3d
    if (
      successo.attributes.render_3d &&
      successo.attributes.render_3d.video.data.attributes.ext === ".mp4"
    ) {
      successoVideoList.push({
        title: successo.attributes.render_3d.meta_name,
        desc: successo.attributes.render_3d.meta_description,
        dur: successo.attributes.render_3d.meta_duration,
        thumb: successo.attributes.render_3d.meta_thumbnail.data
          ? `https://www.netstrategy.it${successo.attributes.render_3d.meta_thumbnail.data.attributes.url}`
          : null,
        loc: `https://www.netstrategy.it${successo.attributes.render_3d.video.data.attributes.url}`,
      });
    }

    //video_intervista
    if (
      successo.attributes.video_intervista &&
      successo.attributes.video_intervista.video.data.attributes.ext === ".mp4"
    ) {
      successoVideoList.push({
        title: successo.attributes.video_intervista.meta_name,
        desc: successo.attributes.video_intervista.meta_description,
        dur: successo.attributes.video_intervista.meta_duration,
        thumb: successo.attributes.video_intervista.meta_thumbnail.data
          ? `https://www.netstrategy.it${successo.attributes.video_intervista.meta_thumbnail.data.attributes.url}`
          : null,
        loc: `https://www.netstrategy.it${successo.attributes.video_intervista.video.data.attributes.url}`,
      });
    }
    //totale video per pagina successo
    videos.push({
      loc: `https://www.netstrategy.it/successi/${successo.attributes.slug}`,
      list: successoVideoList,
    });
  });

  //video recensioni
  const reqReviews = await fetch(
    `https://www.netstrategy.it/api/testimonials?populate=deep`,
    config
  );
  const jsonReviews = await reqReviews.json();
  jsonReviews.data.forEach((review) => {
    if (!review.attributes.slider_video.data) return;
    const video = review.attributes.slider_video.data.attributes;
    videos.push({
      loc: `https://www.netstrategy.it/`,
      list: [
        {
          title: video.name,
          loc: `https://www.netstrategy.it${video.url}`,
        },
      ],
    });
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(videos);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
