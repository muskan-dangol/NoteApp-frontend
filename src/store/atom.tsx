import { atom } from "recoil";


export const noteDataState = atom({
  key: "noteDataState",
  default: {
    title: "",
    content: "",
    // user: String[]
  },
});

export const loginUserState = atom({
  key: "loginUserState",
  default: {
    username: "",
    password: "",
  },
});

export const SignInUserState = atom ({
  key: "SignInUserState",
  default: {
    username: "",
    name: "",
    password: ""
  }
})