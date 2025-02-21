import React, { useRef, useState, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import Divider from '@/components/Divider';
import HeroPages from '@/components/HeroPages';
import Footer from '@/components/Footer';
import ProjectsFilter from '@/components/ProjectsFilter';
import styled from 'styled-components';
import StaticTitle from '@/components/utils/StaticTitle';
import PrimaryButton from '@/components/utils/PrimaryButton';
import { centerContent } from '@/styles/mixins';
import ProjectRow from '@/components/ProjectRow';
import { useDispatch, useSelector } from 'react-redux';
import getStaticData from '@/utils/getStaticData';
import dataRequest from '@/utils/dataRequest';
import Arrow from '@/components/utils/Arrow';
import getPath from '@/utils/getPath';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable, InertiaPlugin } from 'gsap/all';
import RedLink from '@/components/utils/RedLink';
import toSlugText from '@/utils/toSlugText';
import { changeColor } from '../../../redux/customCursorSlice';
import Head from 'next/head';
import PushStructureData from '@/components/PushStructureData';
import { useRouter } from 'next/router';

gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

export async function getStaticProps() {
	const urls = [
		{
			name: 'page',
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project?populate=deep,5`,
		},
		{
			name: 'categorie',
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/custom-categories`,
			transform: false,
		},
		{
			name: 'list',
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?populate=deep,5&pagination[pageSize]=6&sort[0]=updatedAt%3Adesc`,
			transform: false,
			just_fetch: true,
		},
		{
			name: 'list_all',
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?populate=deep,5&pagination[limit]=-1&sort[0]=updatedAt%3Adesc`,
		},
	];

	const staticData = await getStaticData();
	const data = await dataRequest(urls);
	const sortedData = data.categorie
		.filter((cat) => {
			if (
				[
					'Branding',
					'Printed media',
					'SEM',
					'SEO',
					'Social',
					'Website',
				].includes(cat.nome)
			) {
				return false;
			} else {
				return true;
			}
		})
		.map((cat) => {
			return {
				nome: cat.nome,
				slug: toSlugText(cat.nome),
				successi: data.list_all.filter((successo) => {
					const found = successo.attributes.categorie.data.some(
						(catSucc) => catSucc.attributes.nome === cat.nome,
					);
					return found;
				}),
			};
		});
	return await { props: { data, staticData, sortedData } };
}

export default function Projects({ data, staticData, sortedData }) {
	const successi = data.page.attributes;
	const handleList = useSelector((state) => state.listSlice.value);
	const selectedCategory = useSelector(
		(state) => state.filterSuccessesSlice.value,
	);
	let [handle, setHandle] = useState(true);
	const dispatch = useDispatch();
	const listGrid = useRef();
	const listRow = useRef();

	useEffect(() => {
		const setter = handleList == 'grid' ? true : false;
		setHandle(setter);
		fadeUpDown(setter, listGrid.current, listRow.current);
	}, [handleList]);

	const containerRef = useRef();
	const list = data.list.data;

	//! draggable
	const successiList = useRef([]);
	const successiListWrapper = useRef([]);
	useEffect(() => {
		let ctx = gsap.context(() => {
			Draggable.create(successiListWrapper.current, {
				type: 'x',
				bounds: successiList.current,
				inertia: true,
			});
		}, successiList.current);

		return () => ctx.revert();
	}, []);

	const router = useRouter();

	return (
		<>
			<Head>
				<PushStructureData
					page={data.page}
					router={router}
				/>
			</Head>
			<div>
				<HeroPages
					data={successi.hero}
					staticData={staticData}>
					<StaticTitle
						pretitle={staticData.hero}
						title={successi.hero.nome}
					/>
				</HeroPages>
				<ProjectFIlterWrapper>
					<ProjectsFilter
						categories={data.categorie}
						isGrid={handle}
					/>
				</ProjectFIlterWrapper>
				<ContainerList ref={containerRef}>
					<ProjectListGrid
						ref={listGrid}
						className="project-list-grid-ref">
						{sortedData.map((categoria, i) => (
							<React.Fragment key={i}>
								<div className="line">
									<div></div>
								</div>
								<div
									className="project-group"
									id={categoria.slug}>
									<div className="title-wrap">
										<span>{categoria.nome}</span>
									</div>
									<div
										className="successi-list"
										ref={(el) => (successiList.current[i] = el)}>
										<div
											className="successi-list-wrapper"
											ref={(el) => (successiListWrapper.current[i] = el)}>
											{categoria.successi.map((succ, i) => (
												<RedLink
													link={getPath(
														`/successi/${succ.attributes.slug}`,
														true,
													)}
													img={getPath(
														succ.attributes.thumbnail_success.immagine.data
															.attributes.url,
													)}
													// img={getPath(`${succ.attributes.thumbnail_success.immagine.data.attributes.formats.medium.url}`)}
													key={i}>
													<div
														className="successo-wrap"
														onMouseEnter={() =>
															dispatch(changeColor('scaleUp'))
														}
														onMouseLeave={() =>
															dispatch(changeColor('scaleDown'))
														}>
														<ImageContainer>
															<Image
																src={getPath(
																	succ?.attributes?.thumbnail_success?.immagine
																		?.data?.attributes?.formats?.medium?.url ??
																		'/placeholder.svg',
																)}
																alt={
																	succ?.attributes?.thumbnail_success?.immagine
																		?.data?.attributes?.alternativeText ??
																	(succ?.attributes?.thumbnail_success?.nome
																		? `Progetto ${succ.attributes.thumbnail_success.nome}`
																		: 'Progetto')
																}
																fill
																sizes="100%"
																quality={100}
															/>
														</ImageContainer>
														<div className="info">
															<span className="title">
																<Arrow color="#fc1333" />
																{succ.attributes.thumbnail_success.nome}
															</span>
															<p className="desc">
																{succ.attributes.thumbnail_success.description}
															</p>
														</div>
													</div>
												</RedLink>
											))}
										</div>
									</div>
								</div>
							</React.Fragment>
						))}
					</ProjectListGrid>
					<ProjectListRow
						ref={listRow}
						className="project-list-row-ref">
						{list.map((project, i) => {
							return (
								<ProjectRow
									isLast={i == list.length - 1}
									data={project.attributes}
									index={i}
									key={i}
								/>
							);
						})}
					</ProjectListRow>
				</ContainerList>
				{selectedCategory.pagination < selectedCategory.total && (
					<CenteredContent>
						<div onClick={pagination}>
							<PrimaryButton>
								<Plus>+</Plus>
							</PrimaryButton>
						</div>
					</CenteredContent>
				)}
				<Divider />
				<ContactForm mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
				<Footer staticData={staticData} />
			</div>
		</>
	);
}

const ContainerList = styled.div`
	position: relative;
`;

const Separator = styled.div`
	${centerContent}
	margin-top: clamp(1.00rem, calc(0.06rem + 2.28vw), 3rem);
`;
const Line = styled.div`
	height: 1px;
	background-color: ${(props) => props.theme.colors.primaryColor};
	width: 100%;
`;
// Style
const ProjectListGrid = styled.div`
	margin-top: 2rem;
	max-width: 100vw;
	.line {
		> div {
			border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
		}
		${centerContent}
	}
	.project-group {
		display: flex;
		gap: 2.5rem;
		padding-top: 3rem;
		padding-bottom: 2rem;
		max-width: 120rem;
		margin-inline: auto;

		.title-wrap {
			padding-left: 5rem;
			padding-right: 2rem;
			min-width: 25%;
			color: ${({ theme: { colors } }) => colors.primaryColor};
			font-family: ${({ theme: { fonts } }) => fonts.medium};
			font-size: ${(props) => props.theme.fontSizes.size_25_50};
			background-color: ${({ theme: { colors } }) => colors.whiteColor};
			text-transform: uppercase;
			position: relative;
			z-index: 1;
			span {
				display: block;
				max-width: 260px;
			}
		}
		.successi-list {
			flex-grow: 1;
			display: flex;
			overflow: hidden;
			&-wrapper {
				display: flex;
				flex-wrap: nowrap;
				gap: 1.5rem;
				.successo-wrap {
					width: 350px;
					&:hover {
						img {
							scale: 1.05;
						}
						svg {
							transform: translate(4px, 2px);
						}
					}
					.info {
						margin-top: 1rem;
						font-size: clamp(1.06rem, 1.03rem + 0.19vw, 1.25rem);
						.title {
							display: flex;
							align-items: center;
							gap: 0.5rem;
							color: ${({ theme: { colors } }) => colors.primaryColor};
							svg {
								transition: all 350ms ease;
								position: relative;
								width: 24px;
							}
						}
						.desc {
							padding-left: 2rem;
						}
					}
				}
			}
		}
		@media (max-width: 1300px) {
			flex-direction: column;
			.title-wrap span {
				max-width: initial;
			}
			.successi-list {
				margin-left: 5rem;
			}
		}
		@media (max-width: 700px) {
			flex-direction: column;
			.title-wrap {
				padding-left: 1rem;
			}
			.successi-list {
				margin-left: 1rem;
				&-wrapper .successo-wrap {
					width: clamp(
						18.75rem,
						17.7296rem + 5.102vw,
						21.875rem
					); // 320: 300px <- 1300: 350px
				}
			}
		}
	}
`;

const ImageContainer = styled.div`
	position: relative;
	border-radius: 25px;
	overflow: hidden;
	aspect-ratio: 1/1;
	width: 100%;
	img {
		transition: scale 350ms ease;
		object-fit: cover;
		width: 100%;
		height: 100%;
		display: block;
	}
`;

const ProjectListRow = styled.div`
	margin-top: 50px;
`;

const CenteredContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: clamp(2rem, calc(0.06rem + 5.5vw), 7rem);
`;
const Plus = styled.div`
	padding: 0px 3rem;
	font-size: 40px;
	line-height: 0;
`;

const ProjectFIlterWrapper = styled.div`
	${centerContent}
`;

function fadeUpDown(
	setter,
	ref1,
	ref2,
	top = '50vw',
	duration = 0.8,
	ease = 'easeIn',
) {
	// GRID
	if (setter === true) {
		gsap.fromTo(
			ref2,
			{
				opacity: 1,
				duration,
				ease,
				position: 'relative',
				pointerEvents: 'all',
				top: '0',
			},
			{
				opacity: 0,
				duration,
				ease,
				position: 'absolute',
				pointerEvents: 'none',
				top,
			},
		);

		gsap.fromTo(
			ref1,
			{
				opacity: 0,
				duration,
				ease,
				position: 'absolute',
				pointerEvents: 'none',
				top,
			},
			{
				opacity: 1,
				duration,
				ease,
				position: 'relative',
				pointerEvents: 'all',
				top: '0',
			},
		);
	} else {
		gsap.fromTo(
			ref1,
			{
				opacity: 1,
				duration,
				ease,
				position: 'relative',
				pointerEvents: 'all',
				top: '0',
			},
			{
				opacity: 0,
				duration,
				ease,
				position: 'absolute',
				pointerEvents: 'none',
				top,
			},
		);

		gsap.fromTo(
			ref2,
			{
				opacity: 0,
				duration,
				ease,
				position: 'absolute',
				pointerEvents: 'none',
				top,
			},
			{
				opacity: 1,
				duration,
				ease,
				position: 'relative',
				pointerEvents: 'all',
				top: '0',
			},
		);
	}
}

//! ====================
//! COMPONENTE DI BACKUP
//! ====================

// import { useRef, useState, useEffect } from "react";
// import ContactForm from "@/components/ContactForm";
// import Divider from "@/components/Divider";
// import HeroPages from "@/components/HeroPages";
// import Footer from "@/components/Footer";
// import ProjectsFilter from "@/components/ProjectsFilter";
// import Project from "@/components/Project";
// import styled from "styled-components";
// import ProjectBig from "@/components/ProjectBig";
// import StaticTitle from "@/components/utils/StaticTitle";
// import PrimaryButton from "@/components/utils/PrimaryButton";
// import { centerContent } from "@/styles/mixins";
// import ProjectRow from "@/components/ProjectRow";
// import { useDispatch, useSelector } from "react-redux";
// import { updateData } from "../../../redux/dataSlice";
// import { gsap } from "gsap";
// import getStaticData from "@/utils/getStaticData";
// import dataRequest from "@/utils/dataRequest";
// import { headers_api } from "../../../next.config";
// import { updateSuccessSelected } from "../../../redux/filterSuccessesSlice";

// export async function getStaticProps() {
//   const urls = [
//     {
//       name: "page",
//       url: `https://www.netstrategy.it/api/project?populate=deep,5`,
//     },
//     {
//       name: "categorie",
//       url: `https://www.netstrategy.it/api/custom-categories`,
//       transform: false,
//     },
//     {
//       name: "list",
//       url: "https://www.netstrategy.it/api/project-details?populate=deep,3&pagination[pageSize]=6&sort[0]=updatedAt%3Adesc",
//       transform: false,
//       just_fetch: true,
//     },
//   ];

//   const staticData = await getStaticData();
//   const data = await dataRequest(urls);
//   return await { props: { data, staticData } };
// }

// export default function Projects({ data, staticData }) {
//   const successi = data.page.attributes;
//   const [list, setList] = useState([]);
//   const [windowWidth, setWindowWidth] = useState(null);
//   const handleList = useSelector((state) => state.listSlice.value);
//   const selectedCategory = useSelector(
//     (state) => state.filterSuccessesSlice.value
//   );
//   let [handle, setHandle] = useState(true);
//   const dispatch = useDispatch();
//   const listGrid = useRef();
//   const listRow = useRef();

//   useEffect(() => {
//     dispatch(
//       updateSuccessSelected({
//         total: data.list.meta.pagination.total,
//         total_values: data.list.meta.pagination.total,
//       })
//     );
//     setList(data.list.data);

//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     setWindowWidth(window.innerWidth);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       dispatch(
//         updateSuccessSelected({
//           total_values: 0,
//           total: 0,
//           total_categories: [],
//           query: null,
//         })
//       );
//     };
//   }, []);

//   // FILTRO ARTICOLI + PAGINAZIONE
//   const filterSuccesses = async (data) => {
//     const filter =
//       !data.query || data.query.id == "all"
//         ? ""
//         : `filters[categorie][id][$in]=${data.query.id}`;
//     const query = `https://www.netstrategy.it/api/project-details?${filter}&populate=deep,3&pagination[pageSize]=${data.pagination}&sort[0]=updatedAt%3Adesc`;
//     const response = await fetch(query, { headers });
//     const art = await response.json();
//     dispatch(updateSuccessSelected({ total: art.meta.pagination.total }));

//     setList(art.data);
//   };

//   useEffect(() => {
//     if (selectedCategory && selectedCategory.query) {
//       filterSuccesses(selectedCategory);
//     }
//   }, [selectedCategory.query]);

//   useEffect(() => {
//     const setter = handleList == "grid" ? true : false;
//     setHandle(setter);
//     fadeUpDown(setter, listGrid.current, listRow.current);
//   }, [handleList]);

//   const pagination = (e) => {
//     dispatch(
//       updateSuccessSelected({
//         pagination: selectedCategory.pagination + selectedCategory.entry_value,
//       })
//     );
//   };

//   useEffect(() => {
//     if (selectedCategory.pagination != selectedCategory.entry_value) {
//       filterSuccesses(selectedCategory);
//     }
//   }, [selectedCategory.pagination]);

//   const containerRef = useRef();
//   // //! scroll animations
//   // useEffect(() => {
//   //   let projectsCtx = gsap.context(() => {
//   //     //griglia progetti
//   //     gsap.utils.toArray('.project-list-grid-ref > div').forEach((el, i) => {
//   //       gsap.from(el, {
//   //         y: "100%",
//   //         ease: "easeInOut",
//   //         duration: 3,
//   //         scrollTrigger: {
//   //           trigger: el,
//   //           start: "top-=130% bottom",
//   //           end: "top-=130% bottom-=20%",
//   //           scrub: 1,
//   //         },
//   //       })
//   //     })
//   //     //lista progetti
//   //   }, listGrid.current);
//   //   return () => projectsCtx.revert();
//   // }), [];

//   // useEffect(() => {
//   //   // return () => {
//   //   //   dispatch(updateData('grid'));
//   //   // }
//   // }, [])

//   const serverList = data.list.data;
//   return (
//     <div>
//       <HeroPages data={successi.hero} staticData={staticData}>
//         <StaticTitle pretitle={staticData.hero} title={successi.hero.nome} />
//       </HeroPages>

//       <ProjectsFilter categories={data.categorie} />
//       {windowWidth > 1024 && handle && (
//         <Separator>
//           <Line></Line>
//         </Separator>
//       )}
//       <ContainerList ref={containerRef}>
//         <ProjectListGrid ref={listGrid} className="project-list-grid-ref">
//           {list.length > 0
//             ? list.map((project, i) => {
//                 if (
//                   project.attributes.thumbnail_success.big &&
//                   windowWidth > 1024
//                 ) {
//                   return (
//                     <ProjectBig data={project.attributes} index={i} key={i} />
//                   );
//                 } else {
//                   return (
//                     <Project data={project.attributes} index={i} key={i} />
//                   );
//                 }
//               })
//             : serverList.map((project, i) => {
//                 if (
//                   project.attributes.thumbnail_success.big &&
//                   windowWidth > 1024
//                 ) {
//                   return (
//                     <ProjectBig data={project.attributes} index={i} key={i} />
//                   );
//                 } else {
//                   return (
//                     <Project data={project.attributes} index={i} key={i} />
//                   );
//                 }
//               })}
//           {}
//         </ProjectListGrid>
//         <ProjectListRow ref={listRow} className="project-list-row-ref">
//           {list.map((project, i) => {
//             return (
//               <ProjectRow
//                 isLast={i == list.length - 1}
//                 data={project.attributes}
//                 index={i}
//                 key={i}
//               />
//             );
//           })}
//         </ProjectListRow>
//       </ContainerList>
//       {selectedCategory.pagination < selectedCategory.total && (
//         <CenteredContent>
//           <div onClick={pagination}>
//             <PrimaryButton>
//               <Plus>+</Plus>
//             </PrimaryButton>
//           </div>
//         </CenteredContent>
//       )}
//       <Divider />
//       <ContactForm mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
//       <Footer staticData={staticData} />
//     </div>
//   );
// }

// const ContainerList = styled.div`
//   ${centerContent}
//   position: relative;
// `;

// const Separator = styled.div`
//   ${centerContent}
//   margin-top: clamp(1.00rem, calc(0.06rem + 2.28vw), 3rem);
// `;
// const Line = styled.div`
//   height: 1px;
//   background-color: ${(props) => props.theme.colors.primaryColor};
//   width: 100%;
// `;
// // Style
// const ProjectListGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   row-gap: clamp(1.25rem, calc(0.34rem + 4.88vw), 7rem);
//   padding-top: clamp(1.5rem, calc(1.5rem + 4.5vw), 7rem);
// `;

// const ProjectListRow = styled.div`
//   margin-top: 50px;
// `;

// const CenteredContent = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: clamp(2rem, calc(0.06rem + 5.5vw), 7rem);
// `;
// const Plus = styled.div`
//   padding: 0px 3rem;
//   font-size: 40px;
//   line-height: 0;
// `;

// function fadeUpDown(
//   setter,
//   ref1,
//   ref2,
//   top = "50vw",
//   duration = 0.8,
//   ease = "easeIn"
// ) {
//   // GRID
//   if (setter === true) {
//     gsap.fromTo(
//       ref2,
//       {
//         opacity: 1,
//         duration,
//         ease,
//         position: "relative",
//         pointerEvents: "all",
//         top: "0",
//       },
//       {
//         opacity: 0,
//         duration,
//         ease,
//         position: "absolute",
//         pointerEvents: "none",
//         top,
//       }
//     );

//     gsap.fromTo(
//       ref1,
//       {
//         opacity: 0,
//         duration,
//         ease,
//         position: "absolute",
//         pointerEvents: "none",
//         top,
//       },
//       {
//         opacity: 1,
//         duration,
//         ease,
//         position: "relative",
//         pointerEvents: "all",
//         top: "0",
//       }
//     );
//   } else {
//     gsap.fromTo(
//       ref1,
//       {
//         opacity: 1,
//         duration,
//         ease,
//         position: "relative",
//         pointerEvents: "all",
//         top: "0",
//       },
//       {
//         opacity: 0,
//         duration,
//         ease,
//         position: "absolute",
//         pointerEvents: "none",
//         top,
//       }
//     );

//     gsap.fromTo(
//       ref2,
//       {
//         opacity: 0,
//         duration,
//         ease,
//         position: "absolute",
//         pointerEvents: "none",
//         top,
//       },
//       {
//         opacity: 1,
//         duration,
//         ease,
//         position: "relative",
//         pointerEvents: "all",
//         top: "0",
//       }
//     );
//   }
// }
