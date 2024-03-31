import { StateType } from './../../../store';
import { createSelector } from "reselect";
import store from "../../../store";
import { MyPostsType } from "../../../../generalObjectTypes/generalObjectTypes";
// selectors
export function getMyPostsTextareaValue(state: StateType): string {
    return state.MyPosts.textareaValue
}
export function getMyPostsPostsArr2(state: StateType): Array<MyPostsType> {
    return state.MyPosts.postsArr.filter(item => true)
}

export const getMyPostsPostsArr = createSelector(
    [(state: StateType) => state.MyPosts.postsArr],
    (postsArr) => postsArr.filter(item => true))