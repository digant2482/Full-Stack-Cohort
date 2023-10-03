import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLoadingState = selector({
    key: "isLoadingState",
    get: ({get})=>{
        const state = get(userState);
        return state.isLoading;
    }
})