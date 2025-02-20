export default function toSlugText(text) {
  if(text === "" || typeof text == "undefined" || text == null) return;
  // return string.trim().toLowerCase().replaceAll(" ", "-").replaceAll(":", "").replaceAll(".", "").replaceAll(",", "").replaceAll("'", "-");
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[ÀÁÂÃÄÅàáâãäå]/g,"a")
    .replace(/[ÈÉÊËèé]/g,"e")
    .replace(/[ù]/g,"u")
    .replace(/[ò]/g,"o")
    .replace(/[ì]/g,"i")
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')
    .replace(/^\d+/, '')
}
