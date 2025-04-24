import { Outlet } from 'react-router';

import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { Root as CollapsibleRoot } from '@radix-ui/react-collapsible';
import { useState } from 'react';

export function AppLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<CollapsibleRoot
			defaultOpen
			onOpenChange={setIsSidebarOpen}
			className="bg-rotion-900 text-rotion-100 flex min-h-screen w-screen"
		>
			<Sidebar />

			<div className="flex max-h-screen flex-1 flex-col">
				<Header isSidebarOpen={isSidebarOpen} />

				<main className="text-rotion-400 flex flex-1 gap-8 px-10 py-12">
					<Outlet />
				</main>
			</div>
		</CollapsibleRoot>
	);
}
