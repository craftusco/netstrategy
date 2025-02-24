import React from 'react';
import {
	Container,
	Text,
	Box,
	SimpleGrid,
	Flex,
	HStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { HeadingDefault } from './styled-components';
import getPath from '@/utils/getPath';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const ShowcaseV2 = ({ data }) => {
	return (
		<Container
			maxW="120rem"
			py="50px"
			m="auto"
			textAlign="center">
			<Box position="relative">
				<SimpleGrid
					columns={2}
					py="40px"
					spacing="40px">
					<Box>
						<Box mb="30px">
							<HeadingDefault color="#FC1333" fontSize="160px">{data?.tag_title}</HeadingDefault>
						</Box>
						<Flex justify="space-between" textAlign="left">
							<Box flex={1}>
								<Text
									color="#FC1333"
									fontSize={15}
									textTransform="uppercase">
									CLIENTE
								</Text>
								<Text textTransform="uppercase" fontSize={18}>
									{data?.project_description}
								</Text>
							</Box>
							<Box flex={1}>
								<Text
									color="#FC1333"
									fontSize={15}
									textTransform="uppercase">
									Attività
								</Text>
								<Text textTransform="uppercase" fontSize={18}>{data?.core_business}</Text>
							</Box>
						</Flex>
					</Box>
					<Box textAlign="left">
						<Text
							textTransform="uppercase"
							fontSize={15}
							mb="20px">
							Il progetto
						</Text>
						<Box fontSize="26px" mb="20px">
							<ReactMarkdown
								className="showcasev2-description"
								children={data?.description}
							/>
						</Box>
						{data?.url_website && <Text color="#FC1333" textDecoration="none"><Link href={data?.url_website} target="_blank">Leggi di più</Link></Text>}
					</Box>
				</SimpleGrid>
				{data?.content?.map((section, index) => {
					switch (section.__component) {
						case 'successi.quote':
							return (
								<Box
									key={index}
									my="100px"
									maxW="1106px"
									mx="auto"
									position="relative"
									px={4}>
									<img
										src="/quote-icon.png"
										alt="Quote icon"
										className="quote-icon"
									/>
									<ReactMarkdown
										children={section.quote}
										className="section-quote"
									/>
								</Box>
							);

						case 'successi.gallery':
							return (
								<HStack
									key={index}
									mb="20px"
									gap="20px">
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
								</HStack>
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
