/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer } from "electron";
import { ElectronAPI } from "@electron-toolkit/preload";

import { IPC } from "../shared/constants/ipc";
import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IFetchAllDocumentsResponse,
  IFetchUniqueDocumentRequest,
  IFetchUniqueDocumentResponse,
  ISaveDocumentRequest,
} from "../shared/types/ipc";

declare global {
  export interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<IFetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },

  fetchUniqueDocument(
    request: IFetchUniqueDocumentRequest,
  ): Promise<IFetchUniqueDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, request);
  },

  createDocument(): Promise<ICreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
  },

  saveDocument(request: ISaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, request);
  },

  deleteDocument(request: IDeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, request);
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on("new-document", callback);

    return () => {
      ipcRenderer.off("new-document", callback);
    };
  },
};

console.log("contextIsolated: ", process.contextIsolated);

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = api;
}
