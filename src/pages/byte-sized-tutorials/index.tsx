import { GetServerSideProps } from "next";
import { getArticleList } from "~/components/ArticleListBackend";
import ArticleList, { ArticleListProps } from "~/components/ArticleListFrontend"

export const getServerSideProps: GetServerSideProps<ArticleListProps> = async ({ query }) => {
	return await getArticleList({
		collection: "tutorial",
		take: 5,
		cursor: query.cursor as string | undefined,
		dir: query.dir as string | undefined,
		subPage: "byte-sized-tutorials",
	})
}

export default ArticleList;