import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';

import * as Breadcrumbs from './breadcrumbs';
import { IDocument } from '~/src/shared/types/ipc';
import { queryClient } from '../../lib/react-query';

import { CaretDoubleRight, Code, TrashSimple } from '@phosphor-icons/react';

interface IProps {
	isSidebarOpen: boolean;
}

export function Header({ isSidebarOpen }: IProps) {
	const { id } = useParams<{ id: string }>();

	const isMacOS = process.platform === 'darwin';

	const navigate = useNavigate();

	const { mutateAsync: deleteDocumentFn, isPending } = useMutation({
		mutationFn: async () => {
			await window.api.deleteDocument({ id: id! });
		},
		onSuccess: async (response) => {
			queryClient.setQueryData<Array<IDocument>>(['documents'], (documents) => {
				return documents?.filter((document) => document.id !== id);
			});

			navigate('/');
		},
	});

	return (
		<div
			id="header"
			className={clsx(
				'border-rotion-600 region-drag flex h-14 items-center gap-4 border-b px-6 py-[1.125rem] leading-tight transition-all duration-250',
				{
					'pl-24': !isSidebarOpen && isMacOS,
					'w-screen': !isSidebarOpen,
					'w-[calc(100vw-240px)]': isSidebarOpen,
				}
			)}
		>
			<CollapsibleTrigger
				className={clsx('text-rotion-200 hover:text-rotion-50 h-5 w-5', {
					hidden: isSidebarOpen,
					block: !isSidebarOpen,
				})}
			>
				<CaretDoubleRight className="h-4 w-4" />
			</CollapsibleTrigger>

			{id && (
				<>
					<Breadcrumbs.Root>
						<Breadcrumbs.Item>
							<Code weight="bold" className="h-4 w-4 text-pink-500" />
							Estrutura técnica
						</Breadcrumbs.Item>
						<Breadcrumbs.Separator />
						<Breadcrumbs.HiddenItems />
						<Breadcrumbs.Separator />
						<Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
						<Breadcrumbs.Separator />
						<Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
					</Breadcrumbs.Root>

					<div className="region-no-drag inline-flex">
						<button
							disabled={isPending}
							onClick={() => deleteDocumentFn()}
							className="text-rotion-100 hover:text-rotion-50 inline-flex items-center gap-1 text-sm disabled:opacity-60"
						>
							<TrashSimple className="h-4 w-4" />
							Apagar
						</button>
					</div>
				</>
			)}
		</div>
	);
}
