import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { ToC } from '../components/toc';
import { Editor } from '../components/editor';

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

	const initialContent = useMemo(() => {
		if (response) {
			return `<h1>${response.data.title}</h1>${response.data.content ?? '<p></p>'}`;
		}

		return '';
	}, [response]);

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
				{!isFetching && response && <Editor content={initialContent} />}
			</section>
		</div>
	);
}
