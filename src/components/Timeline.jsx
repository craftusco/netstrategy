import React, { useState, useRef, useEffect } from 'react';
import { Heading, Container, Text, AspectRatio, Box } from '@chakra-ui/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { HeadingDefault, LightTitle } from './styled-components';

const Timeline = ({ data }) => {
	const [progress, setProgress] = useState(0);
	const splideRef = useRef(null);
	const [slidesPerView, setSlidesPerView] = useState(3.5);
	const [isSticky, setIsSticky] = useState(false);

	const numberOfSlides = data?.steps.length;

	// Handle sticky scroll
	const handleScroll = () => {
		const scrollY = window.scrollY;
		if (scrollY > 100) { // Threshold per sticky
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	// Adjust slides per view on resize
	const handleResize = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth <= 768) { // Mobile breakpoint
			setSlidesPerView(1);
		} else {
			setSlidesPerView(3.5);
		}
	};

	useEffect(() => {
		// Initial resize
		handleResize();

		// Listen to scroll and resize events
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (!data || !Array.isArray(data.steps)) {
		return (
			<Text textAlign="center" color="gray.500">
				Nessun evento disponibile
			</Text>
		);
	}

	return (
		<Container
			maxW="120rem"
			py="50px"
			m="auto"
			textAlign="center"
			position={isSticky ? 'sticky' : 'static'}
			top="0"
			zIndex={10} // Assicurati che il contenuto sticky sia sopra
			marginBottom="60px"> {/* Padding per evitare sovrapposizione */}
			{data?.pretitle && (
				<LightTitle textAlign="center" marginBottom="20px">
					{data?.pretitle}
				</LightTitle>
			)}
			{data?.title && (
				<HeadingDefault
					red
					textAlign="center"
					marginBottom="90px"
					mobile="margin-bottom: 50px">
					{data?.title}
				</HeadingDefault>
			)}

			<Box position="relative">
				<Splide
					className="timeline-splide"
					ref={splideRef}
					options={{
						type: 'loop',
						loop: true,
						isNavigation: true,
						pauseOnHover: true,
						slideFocus: true,
						perPage: slidesPerView, // Dynamic slides per view
						rewind: true,
						autoplay: true,
						perMove: 1,
						pagination: false,
						arrows: false,
					}}
					onMoved={(splide) => {
						const progressValue = (splide.index / (splide.length - 1)) * 100;
						setProgress(progressValue);
					}}>
					{data?.steps.map((step, i) => (
						<SplideSlide
							key={i}
							style={{
								textAlign: 'left',
								maxWidth: '390px',
								display: 'flex',
								flexDirection: 'column',
							}}>
							<Box
								maxW="350px"
								display="flex"
								flexDirection="column"
								height="100%">
								{/* Titolo */}
								<Heading
									maxW="267px"
									fontSize="30px"
									fontWeight="700"
									textAlign="left"
									color="#FC1333"
									mb="30px"
									minH="80px"
									display="flex"
									alignItems="center">
									{step?.title}
								</Heading>

								{/* Immagine */}
								<AspectRatio
									maxW="350px"
									h="179px"
									borderRadius="10px"
									mb="30px">
									<Image
										src={
											step?.image?.data
												? `https://www.netstrategy.it${step?.image?.data.attributes?.url}`
												: '/placeholder.svg'
										}
										width={350}
										height={179}
										style={{ borderRadius: '10px' }}
										alt={step?.title}
									/>
								</AspectRatio>
								{/* Contenuto */}
								<Text
									color="#000"
									fontSize="20px"
									letterSpacing="0.4px"
									flex="1">
									{step?.content}
								</Text>
							</Box>
						</SplideSlide>
					))}
				</Splide>

				<Box py="20px" id="progress-area" position="relative">
					{/* Barra di progresso personalizzata */}
					<div className="progress-wrapper">
						<div
							className="progress-bar"
							style={{ width: `${progress}%` }}
						/>
					</div>

					{/* Dots */}
					<div className="dots-container">
						{Array.from({ length: numberOfSlides }).map((_, index) => (
							<div
								key={index}
								className={`dot ${
									index <= (progress / 100) * (numberOfSlides - 1)
										? 'active'
										: ''
								}`}
							/>
						))}
					</div>
				</Box>
			</Box>
		</Container>
	);
};

export default Timeline;
