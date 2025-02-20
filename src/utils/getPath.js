export default function getPath(url, checkEnv = false) {


  if(!url || typeof url == 'undefined' || url == 'undefined') return '/transparent-fallback.webp'

  if (
    /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b|jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(
      url
    )
  ) {
    // url = changeFileExtension(url);
  }

  const base_url = typeof window !== "undefined" ? window.location.origin : "";
  const localeDomain = process.env.DOMAIN ? process.env.DOMAIN : base_url;
  /*
  ONLY FOR LOCAL
  const domain = '';
  */
  const domain = checkEnv === false ? "https://www.netstrategy.it" : localeDomain;
  return domain + url;
}

// //! Change file extension from jpg/png to webp
// function changeFileExtension(filename) {
//   // Verifica se l'estensione del file è .jpg o .png
//   const jpgPattern = /\.jpg$/i;
//   const pngPattern = /\.png$/i;

//   if (jpgPattern.test(filename)) {
//     // Cambia l'estensione da .jpg a .webp
//     return filename.replace(jpgPattern, ".webp");
//   } else if (pngPattern.test(filename)) {
//     // Cambia l'estensione da .png a .webp
//     return filename.replace(pngPattern, ".webp");
//   } else {
//     // Restituisce il nome del file invariato se l'estensione non è .jpg o .png
//     return filename;
//   }
// }
