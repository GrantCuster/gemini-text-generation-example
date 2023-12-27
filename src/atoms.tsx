import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const textAtom = atomWithStorage<string>("text-atom", "");
export const textResponseAtom = atomWithStorage<string>(
  "text-response-atom",
  ""
);
export const textResponseGeneratingAtom = atom(false);
