import * as React from "react";

import { GetServerSideProps } from "next";

import { mdxSortByDate } from "~/util/mdxContentSortByDate";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "~/components/Link";
import { Divider } from "@mui/material";

import { useSprings, animated, useChain } from "@react-spring/web"
import { useTheme } from "@mui/material/styles";
import content from "~/__generated__/content";
import { ColumnSchema, MDXFile, TutorialSchema } from "~/Schema";

type TutorialItemProps = {
	entry: MDXFile<TutorialSchema>
}

function TutorialItem({ entry }: TutorialItemProps){
	const tutorial = entry.default.frontmatter;
	const { title, image_url: imageUrl } = tutorial;
	const url = `byte-sized-tutorials/${entry.filename}`
	return <Box
		component={Link}
		href={url}
		display="flex" flexDirection="column" alignItems="stretch"
		gap={1}
		sx={{
			textDecoration: "none",
			color: "black",
			"&:hover .TutorialItem__LinkText": {
				textDecoration: "underline"
			}
		}}
	>
		<Box sx={{ aspectRatio: "16/9" }}>
			<img src={imageUrl} alt="" style={{
				minHeight: 0,
				minWidth: 0,
				width: "100%",
				height: "100%",
				objectFit: "contain"
			}}></img>
		</Box>
		<Box>
			<Box>
				{
					tutorial.keywords?.at(0) && (
						<>
							<Typography variant="subtitle2" display="inline">
								{tutorial.keywords[0]}
							</Typography>
							<Typography variant="subtitle2" display="inline" mx={1}>
								{"\u2022"}
							</Typography>
						</>
					)
				}
				<Typography variant="subtitle2" display="inline">
					{tutorial.author}
				</Typography>
			</Box>
			<Typography variant="h4" component="h3" color="primary.main" className="TutorialItem__LinkText">
				{ tutorial.title }
			</Typography>
		</Box>
	</Box>
}

export default function Blog(){
	const tutorials = (content.tutorials as MDXFile<TutorialSchema>[]).toSorted(mdxSortByDate);
	const columns = content.column as MDXFile<ColumnSchema>[];

	const theme = useTheme();
	const [tutorialsTrails, tutorialsApi] = useSprings(
		tutorials.length,
		(index) => ({
			from: { opacity: 0, y: "1rem" },
			to: { opacity: 1, y: "0" },
			delay: 50 * index,
			config: {
				duration: theme.transitions.duration.enteringScreen
			}
		})
	);

	const [columnTrails, columnApi] = useSprings(
		columns.length,
		(index) => ({
			from: { opacity: 0, y: "1rem" },
			to: { opacity: 1, y: "0" },
			delay: 50 * index,
			config: {
				duration: theme.transitions.duration.enteringScreen
			}
		})
	);

	return <Container sx={{ pt: 2, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
		<Typography variant="h1" mb={4}>Blog</Typography>
		<Box
			display="grid"
			gridTemplateColumns="3fr 1px 1fr"
			columnGap={2}
			flexGrow={1}
		>
			{ /* BYTE SIZED TUTORIALS and articles */ }
			<Box>
				<Typography variant="h2" mb={2}>Byte-Sized Tutorials</Typography>
				<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
					{tutorials.map((entry, i) => (
						<animated.div style={tutorialsTrails[i]}>
							<TutorialItem key={i} entry={entry} />
						</animated.div>
					))}
				</Box>
				<Box display="flex" justifyContent="end" mt={4}>
					<Link href="/byte-sized-tutorials" variant="h5">See all</Link>
				</Box>
			</Box>
			<Divider orientation="vertical"/>
			{ /* COLUMN */ }
			<Box height="100%">
				<Box position="sticky" top={0} height="min(100%, 100vh)">
					<Typography variant="h2" mb={2}>Column</Typography>
					<Box display="grid" gridAutoColumns="1fr" gap={2}>
						{columns.map((entry, i) => (
							<animated.div style={columnTrails[i]}>
								<TutorialItem key={i} entry={entry} />
							</animated.div>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	</Container>
}