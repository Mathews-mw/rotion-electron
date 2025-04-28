import { ToC } from '../components/toc';
import { Editor } from '../components/editor';

export function DocumentPage() {
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
				<Editor />
			</section>
		</div>
	);
}
