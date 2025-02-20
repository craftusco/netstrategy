import React from "react";
import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import Image from "next/image";
import getPath from "@/utils/getPath";
import FullImage from "./FullImage";
import SmallImage from "./SmallImage";
import ImageSlider from "./ImageSlider";
import ImagesGrid from "./ImagesGrid";
import YTvideoEmbed from "./YTVideoEmbed";

export default function ChapterMedia({ chapter: {media_template, media, cover_image, alt_text_cover_image, yt_video, title} }) {
  if((media.data?.length == 0 || media_template == null) && cover_image == null && yt_video == null) return(<></>);

  if(cover_image != null || yt_video != null) {
    return(
      <Medias>
        {yt_video && <YTvideoEmbed id={yt_video} />}
        {cover_image && <SmallImage data={cover_image} altText={alt_text_cover_image ? alt_text_cover_image : title}/>}
      </Medias>
    )
  }

  if(media_template == "img_small") {
    return(
      <Medias>
        {yt_video && <YTvideoEmbed id={yt_video} />}
        <SmallImage data={getPath(media.data[0].attributes.url)} altText={media.data[0].attributes.alternativeText ? media.data[0].attributes.alternativeText : title}/>
      </Medias>
    );
  } else if (media_template == "img_large") {
    return(
      <FullImage data={getPath(media.data[0].attributes.url)} altText={media.data[0].attributes.alternativeText ? media.data[0].attributes.alternativeText : title}/>
    );
  } else if (media_template == "slider") {
    return(
      <>
        {media.data.length <= 1 ?
          <SmallImage data={getPath(media.data[0].attributes.url)} altText={media.data[0].attributes.alternativeText ? media.data[0].attributes.alternativeText : title}/>
          :
          <ImageSlider data={media} onlyDraggable={true}/>
        }
      </>
    );
  } else if (media_template == "grid") {
    return(
      <ImagesGrid data={media.data} />
    );
  } else {
    return(
      <SmallImage data={getPath(media.data[0].attributes.url)} altText={media.data[0].attributes.alternativeText ? media.data[0].attributes.alternativeText : title}/>
    );
  }
  
}

const Container = styled.div`
  /* ${centerContent} */
`
const ImageContainer = styled.div`
  position: relative;

  /* img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  } */
`

const Medias = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2.25rem,calc(1.95rem + 1.29vw),3.5rem);
  & > * {
    width: 100%;
  }
  /* & > * {
    width: 50%;
    @media (max-width: 1080px) {
      width: 100%;
    }
  } */
  margin-top: ${(props) => props.mt};
  /* padding-inline: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem);
  @media (max-width: 600px) {
    padding-inline: 0;
  } */
  max-width: 120rem;
`
