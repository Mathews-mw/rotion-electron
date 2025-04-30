import { useMutation } from '@tanstack/react-query';

import { Plus } from '@phosphor-icons/react';
import { queryClient } from '../../lib/react-query';
import { IDocument } from '~/src/shared/types/ipc';

export function CreatePage() {
	const { mutateAsync: createDocumentFn, isPending } = useMutation({
		mutationFn: async () => {
			const response = await window.api.createDocument();

			return response;
		},
		onSuccess: async (response) => {
			await queryClient.setQueryData<Array<IDocument>>(['documents'], (documents) => {
				if (documents && documents.length >= 0) {
					return [...documents, response.data];
				} else {
					return [response.data];
				}
			});
		},
	});

	return (
		<button
			disabled={isPending}
			onClick={() => createDocumentFn()}
			className="border-rotion-600 hover:bg-rotion-700 absolute right-0 bottom-0 left-0 flex w-[240px] items-center gap-2 border-t px-5 py-4 text-sm disabled:opacity-60"
		>
			<Plus className="h-4 w-4" />
			Novo documento
		</button>
	);
}
