import { atom } from "recoil";

export const noteDataState = atom({
  key: "noteDataState",
  default: {
    title: "",
    content: "",
  },
});
