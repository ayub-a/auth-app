import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx'

import { queryClient } from './config/queryClient.ts';
import { chakraTheme } from './theme/index.ts';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider theme={chakraTheme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
					<ReactQueryDevtools position='bottom' initialIsOpen={false}/>
				</BrowserRouter>
			</QueryClientProvider>
		</ChakraProvider>
	</StrictMode>,
)
