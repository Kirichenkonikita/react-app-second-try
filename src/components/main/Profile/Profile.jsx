import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classNameObj from "./Profile.module.css";
import UsersProfilePage from "../UsersProfilePage/UsersProfilePage";
import React from "react";
import IsNotAuthorised from "../../otherComponents/Auth/IsNotAuthorised/IsNotAuthorised";

export default function Profile(props) {
    return (
        <div className={classNameObj.profileContainer}>
            <div className={classNameObj.backgroundContainer}></div>
            {
                props.isAuthorised
                ? <UsersProfilePage {...props} />
                : <IsNotAuthorised />
            }          
            <MyPostsContainer />
        </div>
    )
}

