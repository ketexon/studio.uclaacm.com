import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material"
import { bodyOffset, headerTopPadding } from "../EventHeader"
import { AnimatePresence, AnimationPlaybackControls, Easing, motion, stagger, useAnimate, useInView } from "framer-motion"
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import { links } from "~/Strings";

import Image from "next/image";
import TouchingGrass from "./Images/hike-touching-grass.webp"
import ACMGenMeeting from "./Images/acm-gen-meeting.webp"
import StudioGenMeeting from "./Images/studio-gen-meeting.webp"


export type CommunityProps = {

}

const MotionImage = motion(Image);

const images = [
	{ alt: "Touching grass on a hike!", image: TouchingGrass },
	{ alt: "Hanging out at ACM General Meeting", image: ACMGenMeeting },
	{ alt: "Members playing bingo at Studio General Meeting", image: StudioGenMeeting },
]

export default function Community(props: CommunityProps) {
	const [curImageIndex, setCurImageIndex] = React.useState(0);
	const curImage = React.useMemo(() => (
		images[curImageIndex]
	), [curImageIndex]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setCurImageIndex(x => (x + 1) % images.length);
		}, 5000);
		return () => {
			clearTimeout(timeout);
		}
	}, [curImage]);

	const theme = useTheme();
	const [scope, animate] = useAnimate();

	const inView = useInView(scope);

	let cancellationToken = false;
	let currentAnimation: AnimationPlaybackControls = null;

	async function animationSequence(){
		const ease: Easing = "easeInOut";

		if(cancellationToken) return;

		animate(
			".community__header-section",
			{ "--animation-percent": 0 },
			{ duration: 0.00001 }
		);
		await animate(
			".community__header",
			{
				"--animation-percent": 0,
				gridTemplateColumns: "1fr auto 1fr",
			},
			{ duration: 0.00001 }
		);
		animate(
			".community__section",
			{ "--animation-percent": 0 },
			{ duration: 0.00001 },
		);

		await animate(
			".community__header-section",
			{ "--animation-percent": 1, "--opacity": 1 },
			{ delay: stagger(
				theme.transitions.duration.complex / 1000,
				{ startDelay: theme.transitions.duration.complex / 1000 }
			)}
		)
		// await currentAnimation;
		await sleep(theme.transitions.duration.complex)

		animate(".community__header", {
			"--animation-percent": 1,
			gridTemplateColumns: "0fr auto 1fr",
		}, {
			duration:theme.transitions.duration.short / 1000,
			ease,
		});

		await sleep(theme.transitions.duration.short);

		animate(".community__section", {
			"--animation-percent": 1,
		}, {
			delay: stagger(
				theme.transitions.duration.shortest / 1000,
				{ startDelay: theme.transitions.duration.shortest / 1000 }
			),
			duration:theme.transitions.duration.shortest / 1000,
		});
	}

	React.useEffect(() => {
		if(inView){
			animationSequence();
			return () => {
				cancellationToken = true;
				currentAnimation?.cancel();
			}
		}
	}, [inView])

	return <Container ref={scope}
		id="socials"
		maxWidth="lg"
		sx={theme => ({
			scrollSnapAlign: "start",
			scrollMarginTop: `calc(${bodyOffset(theme)})`,
			width: "100%",
			height: `calc(100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight})`,
		})}
	>
		<Box>
			<Box className="community__header"
				sx={{
					display: "grid",
					width: "100%",
					translate: `0 calc((1 - var(--animation-percent)) * 32vh)`,
					mb: 2,
				}}
			>
				<Box/>
				<Box width="fit-content" sx={{ gridColumn: 2 }}>
					<Typography variant="display2" component="span" className="community__header-section"
						display="block"
						sx={animationStyle()}
					>
						Interested in a gaming community?
					</Typography>
				</Box>
				<Box/>
			</Box>
			<Stack direction="row">
				<Stack gap={4} sx={{ pt: 2 }}>
					<Typography variant="h2" className="community__section" sx={animationStyle()}>
						Whether interested in games or game dev, come join us and hang out!
					</Typography>
					<Stack direction="row">
						<Button variant="contained" size="medium"
							className="community__section"
							sx={animationStyle()}
							href={links.insta}
						>Instagram</Button>
					</Stack>
				</Stack>
				<Box
					className="community__section"
					sx={[
						{
							flexBasis: 0,
							display: "grid",
							gridTemplateRows: "1fr"
						},
						animationStyle(),
				]}>
					<AnimatePresence initial={false}>
						<Box key={curImageIndex} component={motion.div}
							sx={theme => ({
								overflow: "clip",
								opacity: 0,
								gridRowStart: "1",
								gridColumnStart: "1",
								zIndex: 100,
								position: "relative",
							})}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 16 }}
						>
							<Box component={Image}
								sx={theme => ({
									borderRadius: theme.shape.borderRadius,
								})}
								src={curImage.image} alt={curImage.alt}
							/>
						</Box>
					</AnimatePresence>
				</Box>
			</Stack>
		</Box>
	</Container>
}
