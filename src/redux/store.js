import { combineReducers, createStore } from "redux";
import MyPostsReducer from "./reducers/Profile/MyPosts/MyPostsReducer";
import UsersReducer from "./reducers/Users/UsersReducer";

const reducers = combineReducers({
    MyPosts: MyPostsReducer,
    Users: UsersReducer,
})

const store = createStore(reducers);

window.store = store;

export default store;