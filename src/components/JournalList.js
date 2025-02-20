import { centerContent } from "@/styles/mixins";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function JournalList({ children, mt, date="February .23", articles, selectedCategory}) {
  const containerRef = useRef();
  const blogListHeading = useRef();
  // useEffect(() => {
  //   let journalListCtx = gsap.context(() => {
  //     gsap.from(blogListHeading.current, {
  //       y: "100%",
  //       ease: "easeInOut",
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "top bottom",
  //         end: "top bottom-=10%",
  //         scrub: 1.5,
  //       },
  //     });
      
  //     gsap.utils.toArray('.blog-list-ref > a > *').forEach(el => {
  //       gsap.from(el, {
  //         y: "100%",
  //         ease: "easeInOut",
  //         stagger: 0.1,
  //         scrollTrigger: {
  //           trigger: el,
  //           start: "top-=100% bottom",
  //           end: "top-=100% bottom",
  //           scrub: 1.5,
  //         },
  //       });
  //     });
  //   }, '.blog-list-ref');
  //   return () => journalListCtx.revert();
  // }, []);
  let showTitle = true;
  if(selectedCategory.query && selectedCategory.query.id != "all") {
    let filtered = articles.filter(article => article.categoria.data.id == selectedCategory.query.id);
    showTitle = filtered.length === 0 ? false : true;
  }
  return (
    <Container mt={mt} ref={containerRef}>
      {showTitle && <HeadingContainer ref={blogListHeading}>
        <Heading>
          <span>{date}</span>
        </Heading>
      </HeadingContainer>}
      <div className="blog-list-ref">
        {children}
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};

  .blog-list-ref {
    a:last-child .content  {
      border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
    }
  }
`;

const HeadingContainer = styled.div`
  ${centerContent}
`;

const Heading = styled.div`
  padding-top: clamp(1rem, calc(1rem + 1.04vw), 2rem);  // 16px → 32px
  padding-bottom: clamp(1rem, calc(1rem + 1.04vw), 2rem); // 16px → 32px
  display: flex;
  justify-content: flex-start;
  h2,
  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    line-height: 0.91em;
  }

  span {
    align-self: end;
  }

  @media (min-width: 1280px) {
    margin-top: 0px;
    padding-top: clamp(2.5rem, calc(2.5rem + 1.04vw), 3.5rem); // 16px → 32px
    flex-direction: row;
    justify-content: flex-end;
    border-top: none;
  }
`;

const NoArticle = styled.div`
  ${centerContent}  
`