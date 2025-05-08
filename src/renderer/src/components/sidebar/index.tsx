import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';

import { Search } from './search';
import { Profile } from './profile';
import { CreatePage } from './create-page';
import * as Navigation from './navigation';
import { CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';

import { CaretDoubleLeft } from '@phosphor-icons/react';

export function Sidebar() {
	const isMacOS = process.platform === 'darwin';

	const { data: response } = useQuery({
		queryKey: ['documents'],
		queryFn: async () => {
			const response = await window.api.fetchDocuments();

			console.log('documents : ', response.data);

			return response;
		},
	});

	return (
		<CollapsibleContent className="bg-rotion-800 border-rotion-600 group data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut relative h-screen flex-shrink-0 overflow-hidden border-r">
			<CollapsibleTrigger
				className={clsx(
					'text-rotion-200 hover:text-rotion-50 absolute right-4 inline-flex h-5 w-5 items-center justify-center',
					{
						'top-[1.125rem]': isMacOS,
						'top-6': !isMacOS,
					}
				)}
			>
				<CaretDoubleLeft className="h-4 w-4" />
			</CollapsibleTrigger>

			<div
				className={clsx('region-drag h-14', {
					block: isMacOS,
					hidden: !isMacOS,
				})}
			></div>

			<div
				className={clsx(
					'flex h-full w-[240px] flex-1 flex-col gap-8 transition-opacity duration-200 group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100',
					{
						'pt-6': !isMacOS,
					}
				)}
			>
				<Profile />
				<Search />

				<Navigation.Root>
					<Navigation.Section>
						<Navigation.SectionTitle>Workspace</Navigation.SectionTitle>
						{response && (
							<Navigation.SectionContent>
								{response.data.map((document) => {
									return (
										<Navigation.Link key={document.id} to={`/documents/${document.id}`}>
											{document.title}
										</Navigation.Link>
									);
								})}
							</Navigation.SectionContent>
						)}
					</Navigation.Section>
				</Navigation.Root>

				<CreatePage />
			</div>
		</CollapsibleContent>
	);
}
