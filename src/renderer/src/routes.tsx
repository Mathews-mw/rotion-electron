import { createBrowserRouter } from 'react-router';
import { BlankPage } from './pages/blank';
import { DocumentPage } from './pages/document';
import { AppLayout } from './pages/_layout/app-layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <BlankPage />,
			},
			{
				path: '/document',
				element: <DocumentPage />,
			},
		],
	},
]);
