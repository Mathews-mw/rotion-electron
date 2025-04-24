import { ipcMain } from "electron";

import { IPC } from "../shared/constants/ipc";
import { IFetchAllDocumentsResponse } from "../shared/types/ipc";

ipcMain.handle(IPC.DOCUMENTS.FETCH, async (): Promise<IFetchAllDocumentsResponse> => {
  return {
    data: [
      { id: "1", title: "Ignite", content: '' },
      { id: "2", title: "Discover", content: '' },
      { id: "3", title: "Rocketseat", content: '' },
      { id: "4", title: "Docs", content: '' },
    ]
  };
});
