import React, { useState, useEffect, useMemo } from "react";
import HeroPages from "@/components/HeroPages";
import Footer from "@/components/Footer";
import JournalFilter from "@/components/JournalFilter";
import JournalList from "@/components/JournalList";
import JournalPost from "@/components/JournalPost";
import Divider from "@/components/Divider";
import ContactForm from "@/components/ContactForm";
import StaticTitle from "@/components/utils/StaticTitle";
import PrimaryButton from "@/components/utils/PrimaryButton";
import styled from "styled-components";
import RedLink from "@/components/utils/RedLink";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccessSelected } from "../../../redux/filterSuccessesSlice";
import moment from "moment";
import getPath from "@/utils/getPath";
import PageLoader from "@/components/utils/PageLoader";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";
import { useRouter } from "next/router";
import BlogPagination from "@/components/BlogPagination";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import PushStructureData from "@/components/PushStructureData";

export async function getServerSideProps(context) {
  const urls = [
    {
      name: "page",
      url: `https://www.netstrategy.it/api/journal?populate=deep,5`,
    },
    {
      name: "categorie",
      url: `https://www.netstrategy.it/api/blog/custom-categories`,
      transform: false,
    },
  ];

  const { page } = await context.query;
  const pageOffset = page ? -page : -1;

  let date = { month: moment() };

  const original_month = moment().format("YYYY-MM-DD");
  const start = moment()
    .add(pageOffset, "month")
    .startOf("month")
    .format("YYYY-MM-DD");

  // determine the offset by reading page param
  const monthOffset = page && page != -1 ? -page : -1;
  date.month = moment()
    .add(monthOffset - 1, "month")
    .endOf("month")
    .format("YYYY-MM-DD");

  // const query = `https://www.netstrategy.it/api/journal-details?filters[$and][0][original_date][$gte]=${start}&filters[$and][1][original_date][$lte]=${original_month}&pagination[limit]=-1&populate=deep,3&sort=original_date:desc`; -- original query

  const pageSize = 10; // post limit
  const pageNumber = page && page != -1 ? page : 1;
  const query = `https://www.netstrategy.it/api/journal-details?populate=deep,3&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

  const response = await fetch(strapiGetDataFromQueryURL, {
    method: "POST",
    body: JSON.stringify({ url: query }),
  });
  const arts = await response.json();

  const { data: articles } = arts ?? [];
  const { meta } = arts ?? [];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  return { props: { data, staticData, articles, date, meta } };
}

export default function Journal({ data, staticData, articles, date, meta }) {
  const router = useRouter();
  let { page } = router.query;

  let [pageNumber, setPageNumber] = useState(page ? page : 1);

  const dispatch = useDispatch();
  const blog = data.page.attributes;
  const selectedCategory = useSelector(
    (state) => state.filterSuccessesSlice.value
  );
  const [arts, setArts] = useState(articles);
  const [lastMonth, setLastMonth] = useState("");
  const [originalMonth, setOriginalMonth] = useState(date.month);

  const [isLoading, setIsLoading] = useState(false);

  //NEW FRONT END PAGE FILTER

  const searchParams = useSearchParams()

  const testGetArticles = async (category) => {
    setIsLoading(true);

    console.log(searchParams.get('page'))

    const page = (searchParams.get('page')) ? searchParams.get('page') : 1;
    const pageOffset = page ? -page : -1;

    let date = { month: moment() };

    const original_month = moment().format("YYYY-MM-DD");
    const start = moment()
      .add(pageOffset, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    // determine the offset by reading page param
    const monthOffset = page && page != -1 ? -page : -1;
    date.month = moment()
      .add(monthOffset - 1, "month")
      .endOf("month")
      .format("YYYY-MM-DD");

    const pageSize = 10; // post limit
    const pageNumber = page && page != -1 ? page : 1;

    let query = `https://www.netstrategy.it/api/journal-details?populate=deep,3&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc${category && category.name !== 'ALL' ? `&filters[categoria][nome][$contains]=${category.name}` : ''}`;
    
    const response = await fetch(strapiGetDataFromQueryURL, {
      method: "POST",
      body: JSON.stringify({ url: query }),
    });

    //let articles = await response.json();

    const arts = await response.json();

    const { data: articles } = arts ?? [];
    
    setArts(articles);

    setIsLoading(false);
  };

  useEffect(() => {
    testGetArticles(selectedCategory.query)
  }, [selectedCategory.query])

  useEffect(() => {
    setArts(articles);
    setLastMonth(moment(date.month).format("YYYY-MM-DD"));
    // setLastMonth(moment(date.month).add(-1, "months").format("YYYY-MM-DD"));

    return () => {
      dispatch(
        updateSuccessSelected({
          total_values: 0,
          total: 0,
          total_categories: [],
          query: null,
        })
      );
    };
  }, []);

  const setStringMonth = (d) => {
    return `${moment(d).format("MMMM")} .${moment(d).format("YY")}`;
  };

  const months = useMemo(() => {
    const obj = {};

    arts.forEach((el) => {
      const article = el.attributes;
      const date = moment(article.createdAt).format("YYYY-MM");
      if (!Object.hasOwnProperty.call(obj, date)) {
        obj[date] = {
          date: date,
          formatted_date: setStringMonth(date),
          list: [],
        };
      }

      obj[date].list.push(article);
    });
    return Object.values(obj);
  }, [arts]);

  const parsedMonths = useMemo(() => {
    const pMonths = months.map((el) => {
      return {
        ...el,
        get list() {
          let sortedList = el.list.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          const l = sortedList.map((article, i) => {
            // countArticles++;
            return {
              ...article,
              get counter() {
                return parseInt(i) + i;
              },
              get date_1() {
                return `${moment(article.createdAt).format("MMM")}/N. ${(
                  parseInt(i) + 1
                )
                  .toString()
                  .padStart(2, "0")}`;
              },
              get date_2() {
                return moment(article.createdAt).format("DD.MM.YYYY");
              },
            };
          });
          return l;
        },
      };
    });
    return pMonths;
  }, [months]);

  const countArticles = useMemo(() => {
    let n = 0;
    parsedMonths.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    parsedMonths.forEach((el) => {
      el.list.forEach((art) => {
        if (selectedCategory.query && selectedCategory.query.id != "all") {
          if (art.categoria.data.id != selectedCategory.query.id) return;
        }
        n++;
      });
    });
    return n;
  });

  const activeCategory = useMemo(() => {
    const activeCategory = selectedCategory.total_categories.find((el, i) => {
      if (selectedCategory.query) return el.id == selectedCategory.query.id;
      return i == 0;
    });
    return activeCategory ? activeCategory : {};
  });

  const getArticles = async (start) => {
    setIsLoading(true);
    const end = moment(originalMonth).endOf("month").format("YYYY-MM-DD");
    let query = `https://www.netstrategy.it/api/journal-details?`;
    query += `filters[$or][0][createdAt][$gte]=${start}&filters[$and][1][createdAt][$lte]=${lastMonth}&pagination[limit]=-1`;
    query += `&populate=deep,3`;
    const response = await fetch(strapiGetDataFromQueryURL, {
      method: "POST",
      body: JSON.stringify({ url: query }),
    });
    let articles = await response.json();
    if (selectedCategory.query && selectedCategory.query.id != "all") {
      // query += `&filters[$and][2][categoria][id]=${selectedCategory.query.id}`;
      //TODO: ora se c'è filtro va in dietro di 7 mesi e basta caricando gli articoli vecchi. Bisognerebbe fare che cerca in dietro di mese in mese fino a quando non trova articoli x comunicazione
      //TODO: non funziona perchè problemi tra while e chiamate async
      //* esempio codice
      // while (
      //   arts.filter(
      //     (art) => art.attributes.categoria.id === selectedCategory.query.id
      //   ).length <= 0
      // ) {
      //   const prevMonth = moment(lastMonth).add(-1, "month");
      //   const start = moment(lastMonth).startOf("month").format("YYYY-MM-DD");
      //   setLastMonth(prevMonth.format("YYYY-MM-DD"));
      //   let query = `https://www.netstrategy.it/api/journal-details?`;
      //   query += `filters[$or][0][original_date][$gte]=${start}&filters[$and][1][original_date][$lte]=${lastMonth}&pagination[limit]=-1`;
      //   query += `&populate=deep,3`;
      // const response = await fetch(strapiGetDataFromQueryURL, {
      //   method: 'POST',
      //   body: JSON.stringify({url: query})
      // });
      //   articles = await response.json();
      //   setLastMonth(moment(prevMonth).add(-1, "month").format("YYYY-MM-DD"));
      //   setArts((arts) => arts.concat(articles.data));
      // }
      //* fine esempio

      if (
        arts.filter(
          (art) => art.attributes.categoria.id === selectedCategory.query.id
        ).length <= 0
      ) {
        const prevMonth = moment(lastMonth).add(-7, "month");
        const start = moment(prevMonth).startOf("month").format("YYYY-MM-DD");
        let query = `https://www.netstrategy.it/api/journal-details?`;
        query += `filters[$or][0][createdAt][$gte]=${start}&filters[$and][1][createdAt][$lte]=${lastMonth}&pagination[limit]=-1`;
        query += `&populate=deep,3`;
        const response = await fetch(strapiGetDataFromQueryURL, {
          method: "POST",
          body: JSON.stringify({ url: query }),
        });
        articles = await response.json();
        setLastMonth(moment(prevMonth).add(-1, "month").format("YYYY-MM-DD"));
        setArts(arts.concat(articles.data));
      }
    } else {
      setArts((arts) => arts.concat(articles.data));
    }

    setIsLoading(false);
  };

  const getData = async (moreBtn = false) => {
    // if(arts.length <= INITIAL_ARTICLE_LIMIT_NUM) {
    //   const date = moment(arts[arts.length -1].attributes.original_date).format("MM");
    //   setArts(() => arts.filter(art => moment(art.attributes.original_date).format("MM") != date))
    // }

    const prevMonth = moment(lastMonth).add(-1, "month");

    const start = moment(lastMonth).startOf("month").format("YYYY-MM-DD");
    setLastMonth(prevMonth.format("YYYY-MM-DD"));
    getArticles(start);

    if (moreBtn) {
      const url = new URL(window.location.href);
      url.searchParams.set("page", pageNumber);
      window.history.pushState({}, "", url);

      setPageNumber(pageNumber++);
    }
  };
  /*useEffect(() => {
    if (selectedCategory.query && selectedCategory.query.id != "all") {
      if (
        arts.filter(
          (art) => art.attributes.categoria.id === selectedCategory.query.id
        ).length <= 0
      ) {
        getData();
      }
    }
  }, [selectedCategory.query]);*/

  const totalPages = meta?.pagination?.pageCount;
  const actualPage = meta?.pagination?.page;

  const prevPage = actualPage > 2 ? `/blog?page=${actualPage - 1}` : actualPage == 2 ? `/blog` : null;
  const nextPage =
    actualPage > 0 && actualPage < totalPages
      ? `/blog?page=${actualPage + 1}`
      : null;

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} />
      </Head>
      <div>
        <HeroPages data={blog.hero} staticData={staticData}>
          <StaticTitle
            pretitle={
              blog.hero?.pretitle != "" && blog.hero?.pretitle
                ? blog.hero.pretitle
                : staticData.hero
            }
            title={blog.hero.nome}
          />
        </HeroPages>
        <JournalFilter categories={data.categorie} />
        {/* CICLO OGGETTO PRESO DA CHIAMATA */}
        <div className="arts-container">
          {parsedMonths.map((el, i) => {
            return (
              <JournalList
                key={i}
                date={el.formatted_date}
                articles={el.list}
                selectedCategory={selectedCategory}
              >
                {el.list.map((article, i) => {
                  if (
                    selectedCategory.query &&
                    selectedCategory.query.id != "all"
                  ) {
                    if (article.categoria.data.id != selectedCategory.query.id)
                      return;
                  }
                  return (
                    <RedLink
                      key={i}
                      img={
                        article.immagine?.data
                          ? getPath(article.immagine.data.attributes.url)
                          : article.cover_image
                      }
                      link={getPath(
                        `/${article.categoria.data.attributes.slug}/${article.slug}`,
                        true
                      )}
                    >
                      <JournalPost article={article} />
                    </RedLink>
                  );
                })}
                {/* 
                if(article?.titolo && article?.content && 
                    article?.categoria && 
                    (article?.immagine || article?.cover_image)
                  ) {
                } */}
              </JournalList>
            );
          })}
        </div>
        {isLoading && <PageLoader color="#fc1333" mt="2rem" />}

        <CenteredContent>
          {meta?.pagination?.pageCount > 1 ? (
            <>
              <Head>
                {prevPage && <link rel="prev" href={`${prevPage}`} />}
                {nextPage && <link rel="next" href={`${nextPage}`} />}
              </Head>

              <BlogPagination totalPages={totalPages} actualPage={actualPage} />
            </>
          ) : (
            <></>
          )}
        </CenteredContent>
        <Divider mt="clamp(2rem,calc(5rem + 5vw),8rem)" />
        <ContactForm mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
        <Footer staticData={staticData} />
      </div>
    </>
  );
}

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: clamp(2rem, calc(3rem + 2.07vw), 4rem);
`;
