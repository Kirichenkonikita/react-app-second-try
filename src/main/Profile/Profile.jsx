import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classNameObj from "./Profile.module.css";
import UserInfo from "./UserInfo/UserInfo";

function Profile(props) {
    return(
        <div className={classNameObj.profileContainer}>
            <div className={classNameObj.backgroundContainer}></div>
            <UserInfo />
            <MyPostsContainer />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi illum optio veniam nam modi laudantium harum blanditiis reiciendis qui atque. Similique quod amet assumenda, vitae rerum harum non accusamus praesentium!</p>
        </div>
    )
}

export default Profile;