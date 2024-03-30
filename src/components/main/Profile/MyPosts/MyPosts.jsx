import classNameObj from "./MyPosts.module.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { myPostsActionCreatorsObj, MyPostsThunksObj } from "../../../../redux/reducers/Profile/MyPosts/MyPostsReducer";
import { getMyPostsTextareaValue, getMyPostsPostsArr } from "../../../../redux/reducers/Profile/MyPosts/MyPostsSelectors"
// components
function MyPosts(props) {
    console.log(`MyPosts component was rendered`)
    return (
        <div className={classNameObj.MyPostsContainer}>
            <h3>Заголовок MyPosts</h3>

            <MyPostsFormWithReduxForm onSubmit={formObj => props.addNewPost(formObj.newPostText)} />

            {props.createPostsComponentArrByArr(props.postsArr)}
        </div>
    )
}

function MyPostsForm(props) {
    return (
        <form className={classNameObj.MyPostsContainer} onSubmit={props.handleSubmit}>
            <Field
                name="newPostText"
                component="textarea"
                cols="30"
                rows="10"
            />

            <button>Опубликовать пост</button>
        </form>
    )
}
// MSTP MDTP
function mapStateToProps(state) {
    console.log(`MyPosts MSTF was called`)
    return {
        textareaValue: getMyPostsTextareaValue(state),
        postsArr: getMyPostsPostsArr(state),
    }
}
// compose
const MyPostsFormWithReduxForm = reduxForm({ form: "MyPostsForm" })(MyPostsForm)

export default connect(
    mapStateToProps,
    { ...myPostsActionCreatorsObj, ...MyPostsThunksObj }
)(MyPosts);
