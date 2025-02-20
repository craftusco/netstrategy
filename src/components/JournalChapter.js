import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import splitText from "@/utils/splitText";
import toSlugText from "@/utils/toSlugText";
import { centerContent } from "@/styles/mixins";
import RedLink from "./utils/RedLink";
import PrimaryButton from "./utils/PrimaryButton";
import ShareLinks from "./utils/ShareLinks";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import ChapterMedia from "./ChapterMedia";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import ReactDOM from "react-dom";

gsap.registerPlugin(ScrollToPlugin);

export default function JournalChapter({
  chapter,
  mt,
  isFirst = false,
  isLast = false,
  activeChapter,
  chapters,
  // onIndexClick,
  firstParagrafo = null,
  showBtns = true,
  showShare = true,
}) {
  // const handleScroll = e => {
  //   if (e.currentTarget.scrollHeight == e.currentTarget.offsetHeight) return;
  //   const minScroll = 0;
  //   const maxScroll = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
  //   //TODO: style overflow in paragrafi, set active chapter on scroll (da fare quando abbiamo veri testi articoli)

  //   // if(e.currentTarget.scrollTop > minScroll) {
  //   //   setShowTopGrad(true)
  //   // }
  //   // if(e.currentTarget.scrollTop >= maxScroll) {
  //   //   setShowBottomGrad(false);
  //   // }
  //   // if(e.currentTarget.scrollTop < maxScroll) {
  //   //   setShowBottomGrad(true);
  //   // }
  //   // if(e.currentTarget.scrollTop == minScroll) {
  //   //   setShowTopGrad(false);
  //   // }
  //   // const parentEl = e.currentTarget.parentElement;
  // };
  let chapterParagrafo = chapter.paragrafo;

  // if (isFirst && firstParagrafo) {
  //   chapterParagrafo = firstParagrafo + chapter.paragrafo;
  // }
  return (
    <Container
      mt={mt}
      id={toSlugText(chapter.title)}
      isFirst={isFirst}
      className="chapter-ref"
    >
      {/* //* CONTENUTO ARTICOLO */}
      {isFirst && firstParagrafo && (
        <div className="first-p">
          <ReactMarkdown
            children={firstParagrafo}
            components={{
              img: ({ node, ...props }) => (
                <span
                  style={{
                    textAlign: "center",
                    paddingBlock: "2rem",
                    display: "block",
                    width: "100%",
                    position: "relative",
                    maxWidth: "500px",
                    margin: "0 auto",
                  }}
                >
                  <Image {...props} sizes="100%" fill></Image>{" "}
                </span>
              ),
            }}
          />
        </div>
      )}
      <ContentWrapper>
        {/* <Text onScroll={(e) => handleScroll(e)}> */}
        <Text isFirst={isFirst}>
          <h2 className="title">{chapter.title}</h2>
          <article>
            <ReactMarkdown
              children={chapterParagrafo}
              components={{
                img: ({ node, ...props }) => (
                  <span
                    style={{
                      textAlign: "center",
                      marginBlock: "2rem",
                      display: "block",
                      width: "100%",
                      position: "relative",
                      maxWidth: "500px",
                      margin: "0 auto",
                    }}
                  >
                    <Image {...props} sizes="100%" fill></Image>{" "}
                  </span>
                ),
                a: ({ node, ...props }) => {
                  if (props.href != "#contact") {
                    //* tutti i link che finiscono per ?nofollow, avranno re="nofollow"
                    if (props.href.includes("?nofollow")) {
                      return (
                        <a
                          {...props}
                          href={props.href.replace("?nofollow", "")}
                          rel="nofollow"
                          target="_blank"
                        ></a>
                      );
                    }
                    return <a {...props} target="_blank"></a>;
                  } else {
                    return (
                      <a
                        {...props}
                        onClick={(e) => {
                          e.preventDefault();
                          gsap.to(window, {
                            duration: 1,
                            scrollTo: { y: `#contact`, offsetY: 100 },
                            ease: "Power3.easeOut",
                          });
                        }}
                      ></a>
                    );
                  }
                },
                table: ({ node, ...props }) => {
                  const thead = node.children
                    .find((el) => el.tagName === "thead")
                    .children.find((el) => el.tagName === "tr")
                    .children.filter((el) => el.tagName === "th")
                    .reduce(
                      (acc, el) => (acc += `<th>${el.children[0].value}</th>`),
                      ""
                    );
                  const bodyTR = node.children
                    .find((el) => el.tagName === "tbody")
                    .children.filter((el) => el.tagName === "tr");

                  let tbody = "";
                  bodyTR.forEach((tr) => {
                    tbody += "<tr>";
                    tr.children.forEach((el) => {
                      if (el.type === "element") {
                        tbody += `<td>${el.children[0].value}</td>`;
                      }
                    });
                    tbody += "</tr>";
                  });
                  return (
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr dangerouslySetInnerHTML={{ __html: thead }}></tr>
                        </thead>
                        <tbody
                          dangerouslySetInnerHTML={{ __html: tbody }}
                        ></tbody>
                      </table>
                    </div>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            ></ReactMarkdown>
          </article>
        </Text>
      </ContentWrapper>
      {/* //* MEDIA ARTICOLO */}
      {(chapter.media?.data != null ||
        chapter?.cover_image != null ||
        chapter?.yt_video != null) && <ChapterMedia chapter={chapter} />}
      {/* //* BTN CONNECT DA MOBILE */}
      {/* {showBtns && (
        <ChapterBottomCta
          onClick={() => {
            gsap.to(window, {
              duration: 1,
              scrollTo: `#contact`,
              ease: "Power3.easeOut",
            });
          }}
        >
          <PrimaryButton>Connect</PrimaryButton>
        </ChapterBottomCta>
      )} */}
    </Container>
  );
}

// Style
const Container = styled.div`
  /* margin-top: ${(props) => props.mt}; */
  /* display: flex;
  flex-direction: column;
  row-gap: 3.5rem;
  white-space: pre-wrap; */
  /* padding-top: ${(props) =>
    props.isFirst ? "clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem)" : ""}; */
  /* @media (max-width: 1080px) {
    margin-top: ${(props) => (props.isFirst ? 0 : props.mt)};
  } */

  /* @media (min-width: 1080px) {
    flex-direction: row;
    column-gap: 3rem;
  } */

  & p {
    margin-block-end: 1rem;
  }

  .first-p {
    margin-bottom: 3rem;

    img {
      object-fit: cover;
      position: relative !important;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
`;

const ContentWrapper = styled.div`
  /* ${centerContent} */
  margin-bottom: clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem);
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  width: 100%;
  /* max-height: 850px;
  overflow: auto; */
  -ms-overflow-style: none;
  /* for Internet Explorer, Edge */
  scrollbar-width: none;
  /* for Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  font-size: clamp(1rem, calc(0.86rem + 0.58vw), 1.56rem);

  line-height: 1.35em;
  @media (max-width: 1080px) {
    max-height: initial;
  }

  h3 {
    /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    display: block;
    border-bottom: 1px solid;
    padding-bottom: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px */
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_28};
    font-family: NeueMontreal-Medium;
    /* text-transform: capitalize; */
    margin-top: 2rem;
    margin-bottom: 1rem;
    &::before {
      content: "#";
      font-family: NeueMontreal-Medium;
      margin-right: 0.25rem;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    border-radius: 0.5rem;
  }

  a {
    text-decoration: underline;
  }

  ul,
  ol {
    padding-left: 24px;
    margin-bottom: 1rem;
  }

  h2.title {
    font-size: clamp(1.56rem, calc(1.31rem + 1.25vw), 2.81rem);
    line-height: clamp(1.56rem, calc(1.31rem + 1.25vw), 2.81rem);
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    display: inline-block;
    margin-bottom: 1.5rem;
    /* @media (max-width: 1080px) {
      display: ${({ isFirst }) => (isFirst ? "none" : "block")};
    } */
  }

  article {
    width: 100%;
    .table-wrapper {
      width: 100%;
      overflow: auto;
      margin-block: 2rem;
      table {
        margin-bottom: 0.5rem;
      }
    }
    img {
      object-fit: cover;
      position: relative !important;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
`;

const ChapterBottomCta = styled.div`
  ${centerContent}
  margin: 2rem 0;
  @media (min-width: 1080px) {
    display: none;
  }
`;
