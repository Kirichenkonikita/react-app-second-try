import classNameObj from "./MyPosts.module.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { myPostsActionCreatorsObj, MyPostsThunksObj } from "../../../../redux/reducers/Profile/MyPosts/MyPostsReducer";

function MyPosts(props) {
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

const MyPostsFormWithReduxForm = reduxForm({ form: "MyPostsForm" })(MyPostsForm)

export default connect(state => ({...state.MyPosts}),
 {...myPostsActionCreatorsObj, ...MyPostsThunksObj})(MyPosts);
