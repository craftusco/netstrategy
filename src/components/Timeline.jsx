import React, { useState, useRef, useEffect } from 'react';
import { Heading, Container, Text, AspectRatio, Box } from '@chakra-ui/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { HeadingDefault, LightTitle } from './styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Timeline = ({ data }) => {
	const [progress, setProgress] = useState(0);
	const splideRef = useRef(null);
	const [slidesPerView, setSlidesPerView] = useState(3);
	const [isSticky, setIsSticky] = useState(false);
	const timelineRef = useRef(null);
	const numberOfSlides = data?.steps.length;

	const handleResize = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth <= 768) {
			setSlidesPerView(1);
		} else {
			setSlidesPerView(3.5);
		}
	};

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		handleResize();

		const stickyElement = timelineRef.current;
		ScrollTrigger.create({
			trigger: stickyElement,
			start: 'top top',
			end: '+=200',
			pin: true,
			pinSpacing: false,
			markers: false,
			onEnter: () => setIsSticky(true),
			onLeave: () => setIsSticky(false),
			onEnterBack: () => setIsSticky(true),
			onLeaveBack: () => setIsSticky(false),
		});

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleSlideMove = (splide) => {
		const slidesPerPage = slidesPerView;
		const totalSlides = splide.length;
		const slideProgress = (splide.index / (totalSlides - slidesPerPage)) * 100;
		setProgress(slideProgress);
	};

	if (!data || !Array.isArray(data.steps)) {
		return (
			<Text
				textAlign="center"
				color="gray.500">
				Nessun evento disponibile
			</Text>
		);
	}

	return (
		<Container
			w="100%"
			ml="auto"
			pt="50px"
			pb="100px"
			bg="white"
			zIndex={1000}
			textAlign="center"
			marginBottom="60px"
			overflow="hidden">
			{data?.pretitle && (
				<LightTitle
					textAlign="center"
					marginBottom="20px">
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

			<Box
				position="relative"
				ref={timelineRef}>
				<Splide
					className="timeline-splide"
					ref={splideRef}
					options={{
						type: 'loop',
						drag: 'free',
						autoScroll: {
							speed: 1,
						},
						loop: true,
						isNavigation: true,
						pauseOnHover: false,
						slideFocus: true,
						perMove: 1,
						focus: 'center',
						perPage: slidesPerView,
						rewind: true,
						autoplay: true,
						pagination: false,
						arrows: false,
					}}
					onMoved={handleSlideMove}
				>
					{data?.steps.map((step, i) => (
						<SplideSlide key={i}>
							<Box
								maxW="350px"
								display="flex"
								flexDirection="column"
								height="100%">
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

								<AspectRatio
									maxW="350px"
									h="179px"
									borderRadius="10px"
									mb="50px">
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
								<Text
									color="#000"
									fontSize="20px"
									letterSpacing="0.4px"
									textAlign="left">
									{step?.content}
								</Text>
							</Box>
						</SplideSlide>
					))}
				</Splide>

				<Box
					py="20px"
					id="progress-area"
					position="relative">
					<div className="progress-wrapper">
						<div
							className="progress-bar"
							style={{ width: `${progress}%` }}
						/>
					</div>

					{/* <div className="dots-container">
						{Array.from({ length: Math.ceil(numberOfSlides / slidesPerView) }).map((_, index) => (
							<div
								key={index}
								className={`dot ${
									index <= (progress / 100) * (Math.ceil(numberOfSlides / slidesPerView) - 1)
										? 'active'
										: ''
								}`}
							/>
						))}
					</div> */}
				</Box>
			</Box>
		</Container>
	);
};

export default Timeline;
