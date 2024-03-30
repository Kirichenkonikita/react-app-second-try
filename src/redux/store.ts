import { applyMiddleware, combineReducers, createStore } from "redux";
import MyPostsReducer from "./reducers/Profile/MyPosts/MyPostsReducer";
import UsersReducer from "./reducers/Users/UsersReducer";
import UsersProfilePageReducer from "./reducers/UsersPofilePage/UsersProfilePageReducer";
import AuthReducer from "./reducers/otherComponents/AuthReducer";
import { thunk as thunkMiddleware } from "redux-thunk";
import PreloaderReducer from "./reducers/otherComponents/PreloaderReducer";
import {reducer as formReducer} from "redux-form";

const reducers = combineReducers({
    MyPosts: MyPostsReducer,
    Users: UsersReducer,
    UsersProfilePage: UsersProfilePageReducer,
    Auth: AuthReducer,
    Preloader: PreloaderReducer,
    form: formReducer
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const state = store.getState()
export type StateType = typeof state
export default store;