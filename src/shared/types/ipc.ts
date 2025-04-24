export interface IDocument {
  id: string;
  title: string;
  content?: string;
}

// ===Request===

export type ISaveDocumentRequest = Document;

export interface IFetchUniqueDocumentRequest {
  id: string;
}

export interface IDeleteDocumentRequest {
  id: string;
}

// ===Response===

export interface IFetchAllDocumentsResponse {
  data: Array<IDocument>;
}

export interface IFetchUniqueDocumentResponse {
  data: IDocument;
}

export interface ICreateDocumentResponse {
  data: IDocument;
}
