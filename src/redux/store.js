import { combineReducers, createStore } from "redux";
import MyPostsReducer from "./reducers/Profile/MyPosts/MyPostsReducer";
import UsersReducer from "./reducers/Users/UsersReducer";
import UsersProfilePageReducer from "./reducers/UsersPofilePage/UsersProfilePageReducer";
import AuthReducer from "./reducers/otherComponents/AuthReducer";

const reducers = combineReducers({
    MyPosts: MyPostsReducer,
    Users: UsersReducer,
    UsersProfilePage: UsersProfilePageReducer,
    Auth: AuthReducer,
})

const store = createStore(reducers);

window.store = store;

export default store;