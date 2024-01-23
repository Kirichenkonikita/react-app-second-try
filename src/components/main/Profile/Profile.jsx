import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classNameObj from "./Profile.module.css";
import UserInfo from "./UserInfo/UserInfo";
import SocialMediaIcon from "./../../otherComponents/SocialMediaIcon/SocialMediaIcon";

function Profile(props) {
    return(
        <div className={classNameObj.profileContainer}>
            <div className={classNameObj.backgroundContainer}></div>
            <UserInfo />
            <MyPostsContainer />
            <SocialMediaIcon userSocialMediaURL="https://vk.com/dikomatnaya" 
            socialMediaType="vk"/>
        </div>
    )
}

export default Profile;