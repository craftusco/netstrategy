import React from 'react';
import { Container, Text, Box, SimpleGrid, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { HeadingDefault, LightTitle } from './styled-components';
import getPath from '@/utils/getPath';
import ReactMarkdown from 'react-markdown';

const ShowcaseV2 = ({ data }) => {
	console.log('data-page:', data);

	return (
		<Container
			maxW="120rem"
			py="50px"
			m="auto"
			textAlign="center">
			{data?.title && (
				<HeadingDefault
					red
					textAlign="center"
					marginBottom="90px"
					mobile="margin-bottom: 50px;">
					{data?.title}
				</HeadingDefault>
			)}

			<Box position="relative">
				{data?.content?.map((section, index) => {
					switch (section.__component) {
						case 'successi.quote':
							return (
								<Box
									key={index}
									my="100px"
									px={4}>
									<ReactMarkdown children={section.quote} />
								</Box>
							);

						case 'successi.gallery':
							return (
								<Flex
									key={index}
									gap={10}>
									{section.gallery?.map((item) => (
										<Box
											key={item.id}
											position="relative"
											w={`${item.width}%`}
											h="814px">
											<Image
												src={
													item.image?.data
														? getPath(
																item.image?.data?.attributes?.formats?.medium
																	?.url,
														  )
														: '/placeholder.svg'
												}
												alt={item.alt || 'Galleria immagine'}
												layout="fill"
												objectFit="cover"
												quality={90}
											/>
										</Box>
									))}
								</Flex>
							);

						default:
							return null;
					}
				})}
			</Box>
		</Container>
	);
};

export default ShowcaseV2;
