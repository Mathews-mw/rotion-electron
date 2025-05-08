import { MagnifyingGlass } from '@phosphor-icons/react';
import { SearchBar } from '../search-bar';
import { useState } from 'react';

export function Search() {
	const [open, setOpen] = useState(false);

	function handleOpenChange(isOpen: boolean) {
		setOpen(isOpen);
	}

	return (
		<>
			<button
				onClick={() => handleOpenChange(true)}
				className="text-rotion-100 hover:text-rotion-50 mx-5 flex items-center gap-2 text-sm"
			>
				<MagnifyingGlass className="h-5 w-5" />
				Busca rápida
			</button>

			<SearchBar open={open} onOpenChange={handleOpenChange} />
		</>
	);
}
