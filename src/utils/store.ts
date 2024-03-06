import { atom } from "jotai";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authInfo = atom<{ singin: boolean, authInfo: any }>({
    singin: false,
    authInfo: {
        username: {}
    }
});