import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const productState = atom({
  key: "products",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
