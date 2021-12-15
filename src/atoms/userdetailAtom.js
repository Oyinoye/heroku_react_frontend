import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const userdetailState = atom({
  key: "user_details",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
