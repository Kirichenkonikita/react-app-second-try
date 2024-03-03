import { applyMiddleware, combineReducers, createStore } from "redux";
import MyPostsReducer from "./reducers/Profile/MyPosts/MyPostsReducer";
import UsersReducer from "./reducers/Users/UsersReducer";
import UsersProfilePageReducer from "./reducers/UsersPofilePage/UsersProfilePageReducer";
import AuthReducer from "./reducers/otherComponents/AuthReducer";
import { thunk as thunkMiddleware } from "redux-thunk";

const reducers = combineReducers({
    MyPosts: MyPostsReducer,
    Users: UsersReducer,
    UsersProfilePage: UsersProfilePageReducer,
    Auth: AuthReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;