import dataRequest from '@/utils/dataRequest';
import getStaticData from '@/utils/getStaticData';
import SubpillarComponent from '@/components/SubpillarComponent';
import SubpillarComponent2 from '@/components/SubpillarComponent2';
import JournalDetail from '@/components/JournalDetail';
import { strapiGetDataFromQueryURL } from '@/utils/proxyUrl';


export async function getStaticPaths() {
	const response = await fetch(strapiGetDataFromQueryURL, {
		method: 'POST',
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?pagination[limit]=-1`,
		}),
	});

	const response2 = await fetch(strapiGetDataFromQueryURL, {
		method: 'POST',
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars-2-0?pagination[limit]=-1`,
		}),
	});

	const blogResponse = await fetch(strapiGetDataFromQueryURL, {
		method: 'POST',
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/journal-details?pagination[limit]=-1&populate=deep`,
		}),
	});

	const subpillarData1 = await response.json();
	const subpillarData2 = await response2.json();
	const blogData = await blogResponse.json();
	// const blogData = {data:[]};

	const data = [
		...subpillarData1.data,
		...subpillarData2.data,
		...blogData.data,
	];
	//creating an array of objects
	const paths = data.map((el) => {
		return {
			params: {
				subpillar: `${el.attributes.slug.trim()}`,
				pillar: `${
					el.attributes.pillar
						? el.attributes.pillar.trim()
						: el.attributes.categoria.data.attributes.slug.trim()
				}`,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// contollo se sono in una subpillar o in un articolo
	const res = await fetch(strapiGetDataFromQueryURL, {
		method: 'POST',
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?pagination[limit]=-1`,
		}),
	});
	const res2 = await fetch(strapiGetDataFromQueryURL, {
		method: 'POST',
		body: JSON.stringify({
			url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars-2-0?pagination[limit]=-1`,
		}),
	});
	let { data: subpillarsData1 } = await res.json();
	let { data: subpillarsData2 } = await res2.json();
	const combinedSubpillarsData = [...subpillarsData1, ...subpillarsData2];
	const subpillars = combinedSubpillarsData.map(
		(subpillar) => subpillar.attributes.slug,
	);

	let urls, pageName;

	let pillarParam;
	let noFilter = false;

	//Adapt pillar name for custom categories
	if (
		params.pillar == 'social' ||
		params.pillar == 'siti' ||
		params.pillar == 'comunicazione'
	) {
		pillarParam = 'branding-website';
	} else if (params.pillar == 'sem-adv') {
		pillarParam = 'adv-sem';
	} else if (
		params.pillar == 'inbound-marketing' ||
		params.pillar == 'web-marketing' ||
		params.pillar == 'intelligenza-artificiale'
	) {
		noFilter = true;
	} else if (params.pillar == 'crm') {
		pillarParam = 'crm';
	} else {
		pillarParam = params.pillar;
	}

	if (!subpillars.includes(params.subpillar)) {
		//se è un articolo
		urls = [
			{
				name: 'page',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/journal-details?populate=deep,4&filters[slug]=${params.subpillar}`,
			},
			{
				name: 'list',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?filters[pillar]=${params.pillar}&populate[categoria][populate][]=*&populate[immagine][fields][0]=url,alternativeText,name,ext&fields=slug,nome,pillar`,
			},
			{
				name: 'blog_index_data',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/journal?pagination[limit]=-1&populate=deep`,
			},
			{
				name: 'categories',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/categorie-subpillars?populate=deep,2&pagination[limit]=-1`,
			},
			{
				name: 'pillar_data',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/contenuti-subpillars?filters[pillar][slug]=${params.pillar}&populate=deep,2`,
			},
		];
		pageName = 'dettaglio-blog';
	} else {
		//se è una subpillar
		urls = [
			{
				name: 'subpillar2',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars-2-0?filters[pillar][$eq]=${params.pillar}&filters[slug][$eq]=${params.subpillar}&populate=deep,6`,
			},
			{
				name: 'page',
				// url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?filters[slug]=${params.subpillar}&filters[pillar]=${params.pillar}&populate[contenuti_subpillar][populate][divisore][populate][0]=*&populate[contenuti_subpillar][populate][pillar][populate][0]=intro,hero,collegamenti,heading_3&populate[immagine][fields][0]=url,alternativeText,name,ext&populate[intro][populate][media][fields][0]=url,alternativeText,name,ext&populate[obbiettivi][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[obbiettivi][populate][obbiettivi][populate][0]=icona&populate[obbiettivi][populate][loghi_aziende][fields][0]=url,alternativeText,name,ext&populate[livelli][populate][livelli][populate][0]=*&populate[livelli][populate][loghi_aziende][fields][0]=url,alternativeText,name,ext&populate[collegamenti][populate][immagini][fields][0]=url,alternativeText,name,ext&populate[specialist][populate][0]=video,utente,meta_thumbnail&populate[project_detail][populate][thumbnail_success][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[project_detail][populate][thumbnail_success][populate][immagine_mobile][fields][1]=url,alternativeText,name,ext&populate[project_detail][populate][thumbnail_success][populate][info_success][populate][0]=*&populate[project_detail][populate][thumbnail_success][populate][utente][populate][0]=*&populate[project_detail][populate][categorie][populate][0]=*&populate[elenco][populate][elenco][populate][0]=*&populate[immagine_mobile][fields][0]=url,alternativeText,name,ext&populate[categoria][populate][0]=*&populate[extra][populate][0]=*&populate[offerta][populate][0]=*&populate[restyling][populate][0]=loghi&populate[restyling_heading][populate][0]=*`,
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?filters[slug]=${params.subpillar}
        &filters[pillar]=${params.pillar}
        &populate=*.*`,
			},
			{
				name: 'list',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?filters[pillar]=${params.pillar}&populate[categoria][populate][]=*&populate[immagine][fields][0]=url,alternativeText,name,ext&fields=slug,nome,pillar`,
			},
			{
				name: 'list2',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars-2-0?filters[pillar]=${params.pillar}&populate=*`,
			},
			{
				name: 'pillar_data',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/contenuti-subpillars?filters[pillar][slug]=${params.pillar}&populate=deep,2`,
			},
			{
				name: 'categories',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/categorie-subpillars?populate=deep,2&pagination[limit]=-1`,
			},
			{
				name: 'testimonials',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/testimonials?populate=*&sort=updatedAt:desc`,
			},
			{
				name: 'projects',
				url: `${
					process.env.NEXT_PUBLIC_STRAPI_URL
				}/project-details?populate[thumbnail_success][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[thumbnail_success][populate][immagine_mobile][fields][1]=url,alternativeText,name,ext&populate[categorie][populate][0]=*&populate[thumbnail_success][populate][info_success][fields]${
					noFilter !== true
						? `&filters[categorie][slug][$contains]=${pillarParam}`
						: '&sort=updatedAt:asc&pagination[pageSize]=12'
				}`, //&filters[categorie][nome][$eq]=${params.pillar}
				transform: false,
			},
			{
				name: 'categorie',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/custom-categories`,
				transform: false,
			},
			{
				name: 'culture',
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/culture?populate[team][populate][creators][populate][0]=*&populate[team][populate][creators][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[team][populate][heading][populate][0]=*`,
			},
		];
		pageName = 'subpillar';
	}

	const staticData = await getStaticData();
	const data = await dataRequest(urls);

	if (pageName === 'subpillar') {
		data.list =
			data.list2.length > 0
				? data.list.concat(data.list2)
				: [...data.list, { attributes: data.list2 }];
	}

	if (data.page.length == 0 && data.subpillar2.length == 0) {
		return {
			notFound: true,
		};
	}

	// data.categories.unshift({
	//   id: null,
	//   attributes: {
	//     nome: "Altro",
	//     slug: "leftover",
	//   },
	// });

	let categorizedList = [];

	let catTabs = [];
	let catContent = [];

	data.categories.forEach((cat) => {
		const subpillars = data.list.filter((subpillar) => {
			// if (cat.attributes.slug == "leftover") {
			//   return subpillar.attributes.categoria?.data == null;
			// } else {
			//   return (
			//     subpillar.attributes.categoria?.data?.attributes.slug ===
			//     cat.attributes.slug
			//   );
			// }
			return (
				subpillar.attributes.categoria?.data?.attributes.slug ===
				cat.attributes.slug
			);
		});

		if (subpillars.length === 0) return;
		categorizedList.push({
			name: cat.attributes.nome,
			slug: cat.attributes.slug,
			subpillars,
		});

		catTabs.push({
			name: cat.attributes.nome,
			slug: cat.attributes.slug,
		});
		catContent.push({
			subpillars,
		});
	});

	data.categorizedList = categorizedList;

	data.catTabs = catTabs;
	data.catContent = catContent;

	return await { props: { data, staticData, pageName, params } };
}

export default function Subpillar({ data, staticData, pageName, params }) {
	if (pageName === 'subpillar') {
		const breadcrumbLinksSubpillar = [
			{ href: '/', text: 'Home' },
			{
				href: '/' + data?.pillar_data?.pillar?.data?.attributes?.slug,
				text: data?.pillar_data?.pillar?.data?.attributes?.nome,
			},
			{ text: data.page?.nome },
		];

		console.log('subpilalr-data:', data);
		//componente subpillar
		if (
			params.subpillar == 'agenzia-google-ads' ||
			params.subpillar == 'gestione-social' ||
			params.subpillar ==
				'come-scegliere-agenzia-web-marketing-per-il-tuo-ecommerce' ||
			(params.pillar == 'web-marketing' && params.subpillar == 'preventivo')
		) {
			return (
				<SubpillarComponent2
					dataSubpillar={data.subpillar2}
					staticData={staticData}
					data={data}
				/>
			);
		} else {
			return (
				<SubpillarComponent
					data={data}
					staticData={staticData}
					breadcrumbLinks={breadcrumbLinksSubpillar}
					subpillar={data.subpillar2}
				/>
			);
		}
	} else {
		const breadcrumbLinksBlog = [
			{ href: '/', text: 'Home' },
			{
				href: '/' + data?.pillar_data?.pillar?.data?.attributes?.slug,
				text: data?.pillar_data?.pillar?.data?.attributes?.nome,
			},
			{ text: data.page?.titolo },
		];
		//componente dettaglio blog
		return (
			<JournalDetail
				data={data}
				staticData={staticData}
				breadcrumbLinks={breadcrumbLinksBlog}
			/>
		);
	}
}
