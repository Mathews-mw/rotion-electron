import Document from '@tiptap/extension-document';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export interface IContentUpdateDocumentParams {
	title: string;
	content: string;
}

interface IProps {
	content: string;
	onContentUpdate: (params: IContentUpdateDocumentParams) => void;
}

export function Editor({ content, onContentUpdate }: IProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				document: false,
			}),
			Document.extend({
				content: 'heading block*',
			}),
			Highlight,
			Typography,
			Placeholder.configure({
				placeholder: 'Untitled',
				emptyEditorClass:
					'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
			}),
		],
		content,
		autofocus: 'end',
		editorProps: {
			attributes: {
				class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
			},
		},
		onUpdate: ({ editor }) => {
			const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/;
			const parsedContent = editor.getHTML().match(contentRegex)?.groups;

			const title = parsedContent?.title ?? '';
			const content = parsedContent?.content ?? '';

			onContentUpdate({
				title,
				content,
			});
		},
	});

	return <EditorContent editor={editor} className="w-[65ch]" />;
}
