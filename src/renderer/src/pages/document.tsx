import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ToC } from '../components/toc';
import { queryClient } from '../lib/react-query';
import { IDocument } from '~/src/shared/types/ipc';
import { Editor, IContentUpdateDocumentParams } from '../components/editor';

export function DocumentPage() {
	const { id } = useParams<{ id: string }>();

	const { data: response, isFetching } = useQuery({
		queryKey: ['document', id],
		queryFn: async () => {
			const response = await window.api.fetchUniqueDocument({ id: id! });

			return response;
		},
		enabled: !!id,
	});

	const { mutateAsync: saveDocumentFn, isPending } = useMutation({
		mutationFn: window.api.saveDocument,
		onSuccess: async (_, variables) => {
			queryClient.setQueryData<IDocument[]>(['documents'], (documents) => {
				return documents?.map((document) => {
					if (document.id === id) {
						return { ...document, title: variables.title };
					}

					return document;
				});
			});
		},
	});

	const initialContent = useMemo(() => {
		if (response) {
			return `<h1>${response.data.title}</h1>${response.data.content ?? '<p></p>'}`;
		}

		return '';
	}, [response]);

	async function handleEditorContentUpdate({ title, content }: IContentUpdateDocumentParams) {
		await saveDocumentFn({
			id: id!,
			title,
			content,
		});
	}

	return (
		<div className="flex flex-1 gap-8">
			<aside className="sticky top-0 hidden lg:block">
				<span className="text-rotion-300 text-xs font-semibold">TABLE OF CONTENTS</span>

				<ToC.Root>
					<ToC.Link>Princípios do React</ToC.Link>
					<ToC.Section>
						<ToC.Link>Sobre React React</ToC.Link>
						<ToC.Link>Como usar React</ToC.Link>
					</ToC.Section>
					<ToC.Link>Projeto React</ToC.Link>
					<ToC.Section>
						<ToC.Link>Criando um projeto React</ToC.Link>
						<ToC.Link>Componentes</ToC.Link>
						<ToC.Link>Estados</ToC.Link>
						<ToC.Link>Side Effects</ToC.Link>
					</ToC.Section>
				</ToC.Root>
			</aside>

			<section className="flex flex-1 flex-col items-center">
				{!isFetching && response && <Editor content={initialContent} onContentUpdate={handleEditorContentUpdate} />}
			</section>
		</div>
	);
}
