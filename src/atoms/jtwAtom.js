import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const jwtState = atom({
  key: "jwt",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
