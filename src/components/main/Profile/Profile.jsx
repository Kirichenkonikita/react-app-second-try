import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classNameObj from "./Profile.module.css";
import UserInfo from "./UserInfo/UserInfo";

function Profile(props) {
    return(
        <div className={classNameObj.profileContainer}>
            <div className={classNameObj.backgroundContainer}></div>
            <UserInfo />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;