import { Command } from 'cmdk';
import { File, MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

interface IProps {
	open: boolean;
	onOpenChange: (value: boolean) => void;
}

export function SearchBar({ open, onOpenChange }: IProps) {
	const navigate = useNavigate();

	const { data: response } = useQuery({
		queryKey: ['documents'],
		queryFn: async () => {
			const response = await window.api.fetchDocuments();

			return response;
		},
	});

	function handleOpenDocument(documentId: string) {
		navigate(`/documents/${documentId}`);
		onOpenChange(false);
	}

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && e.metaKey) {
				onOpenChange(!open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [onOpenChange, open]);

	return (
		<Command.Dialog
			className="bg-rotion-800 text-rotion-100 border-rotion-600 fixed top-24 left-1/2 w-[480px] max-w-full -translate-x-1/2 rounded-md border shadow-2xl"
			open={open}
			onOpenChange={onOpenChange}
			label="Search"
		>
			<div className="border-rotion-700 flex items-center gap-2 border-b p-4">
				<MagnifyingGlass className="h-5 w-5" />
				<Command.Input
					autoFocus
					placeholder="Buscar documentos..."
					className="text-rotion-50 placeholder:text-rotion-200 w-full bg-transparent text-sm focus:outline-none"
				/>
			</div>
			<Command.List className="scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800 max-h-48 py-2">
				<Command.Empty className="text-rotion-200 px-4 py-3 text-sm">Nenhum documento encontrado.</Command.Empty>

				{response?.data?.map((document) => {
					return (
						<Command.Item
							key={document.id}
							onSelect={() => handleOpenDocument(document.id)}
							className="text-rotion-50 hover:bg-rotion-700 aria-selected:!bg-rotion-600 flex items-center gap-2 px-4 py-3 text-sm"
						>
							<File className="h-4 w-4" />
							{document.title}
						</Command.Item>
					);
				})}
			</Command.List>
		</Command.Dialog>
	);
}
