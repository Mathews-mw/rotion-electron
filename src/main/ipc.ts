/* eslint-disable prettier/prettier */
import { ipcMain } from "electron";

import { IPC } from "../shared/constants/ipc";
import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IDocument,
  IFetchAllDocumentsResponse,
  IFetchUniqueDocumentRequest,
  IFetchUniqueDocumentResponse,
  ISaveDocumentRequest,
} from "../shared/types/ipc";
import { store } from "./store";
import { randomUUID } from "node:crypto";

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<IFetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get("documents")),
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (
    event,
    { id }: IFetchUniqueDocumentRequest,
  ): Promise<IFetchUniqueDocumentResponse> => {
    const document = store.get<string, IDocument>(`documents.${id}`);

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<ICreateDocumentResponse> => {
    const id = randomUUID();

    const document: IDocument = {
      id,
      title: "Untitled",
    };

    store.set(`documents.${id}`, document);

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (
    event,
    { id, title, content }: ISaveDocumentRequest,
  ): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    });
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (event, { id }: IDeleteDocumentRequest): Promise<void> => {
    store.delete(`documents.${id}`);
  },
);
