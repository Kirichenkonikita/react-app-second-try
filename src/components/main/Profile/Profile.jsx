import classNameObj from "./Profile.module.css";
import React from "react";
import MyStatus from "./MyStatus/MyStatus";
import IsAuthorised from "../../otherComponents/Auth/IsAuthorised/IsAuthorised";
import withAuthRedirect from "../../../hoc/withAuthRedirect"
import MyPosts from "./MyPosts/MyPosts";


function Profile(props) {
    return (
        <div className={classNameObj.profileContainer}>
            <div className={classNameObj.backgroundContainer}></div>

            <IsAuthorised />

            <MyStatus/>
            
            <MyPosts />
        </div>
    )
}

export default withAuthRedirect(Profile);