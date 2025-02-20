// Share on specifi social
const shareArticleOn = (articleUrl, social) => {
  let shareUrl;

  switch (social) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}`;
      break;
    case "whatsapp":
      shareUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
        articleUrl
      )}`;
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(articleUrl)}`;
      break;
  }

  const width = window.innerWidth / 1.8;
  const height = window.innerHeight / 1.5;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  // console.log(left, top);

  window.open(
    shareUrl,
    "Condividi su Facebook",
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

// Share with native sharing (navigator)
const shareArticleGeneric = async (articleUrl) => {
  const shareData = {
    url: articleUrl,
    // title: articleTitle,
    // text: articleText,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Errore durante la condivisione.", error);
    }
  }
};

export { shareArticleOn, shareArticleGeneric };
