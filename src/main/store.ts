/* eslint-disable prettier/prettier */
import Store from "electron-store";
import { IDocument } from "../shared/types/ipc";

interface StoreType {
  documents: Record<string, IDocument>;
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
});

console.log("store path: ", store.path);
