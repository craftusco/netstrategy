export default function videoHasAudio(video) {
  // console.log(
  //   video.mozHasAudio ||
  //     Boolean(video.volume) ||
  //     Boolean(video.audioTracks && video.audioTracks.length)
  // );

  //   // Check if the video has an audio track.
  //   if (video.audioTracks) {
  //     return true;
  //   }

  //   // Check for the vendor prefixed properties.
  //   if (video.mozHasAudio || video.volume > 0) {
  //     return true;
  //   }

  //   // The video has no audio.
  //   return false;
  return (
    video.mozHasAudio ||
    Boolean(video.volume) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  );
}


