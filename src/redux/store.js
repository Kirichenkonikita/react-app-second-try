import { combineReducers, createStore } from "redux";
import MyPosts from "./reducers/Profile/MyPosts/MyPosts";

const reducers = combineReducers({
    MyPosts,
})

const store = createStore(reducers);

window.store = store;

export default store;