export default function getPath(url, checkEnv = false) {
  if (!url || url === "undefined") return "/transparent-fallback.webp";

  // Definizione del dominio basata esclusivamente su variabili d'ambiente
  const domain = checkEnv ? process.env.DOMAIN || "" : process.env.DEFAULT_DOMAIN || "https://www.netstrategy.it";

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
