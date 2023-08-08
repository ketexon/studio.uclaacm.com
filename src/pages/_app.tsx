import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";

import { AppPropsWithLayout } from "~/@types";

import "~/stylesheets/main.scss"

import Layout from "~/components/Layout";

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

/*const supabase = createClient(
	"https://ktdgdxrdzrfckapsuxiw.supabase.co",
	process.env.SUPABASE_PUBLIC_ANON_KEY);*/

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	// optional layout function
	const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

	return <>
		{/*<SessionContextProvider supabaseClient={supabase}>*/}
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{getLayout(<Component {...pageProps} />)}
		</ThemeProvider>
		{/*</SessionContextProvider>*/}
	</>
}