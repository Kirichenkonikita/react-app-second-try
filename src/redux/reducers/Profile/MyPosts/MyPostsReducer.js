import Post from "../../../../components/main/Profile/MyPosts/Post/Post";

const UPDATE_TEXTAREA_VALUE = "UPDATE_TEXTAREA_VALUE";
const ADD_POST = "ADD_POST";

export function updateTextareaValueAC(newValue) {
    return {
        type: UPDATE_TEXTAREA_VALUE,
        newValue,
    }
}

export function addNewPost(newPostText) {
    return {
        type: ADD_POST,
        newPostText
    }
}

const initialMyPostsState = {
    textareaValue: "Привет, это мой первый пост!",
    postsArr: [],
};

export default function MyPostsReducer(state = initialMyPostsState, action) {
    switch (action.type) {
        case UPDATE_TEXTAREA_VALUE:
            return {
                ...state,
                textareaValue: action.newValue,
            }
        case ADD_POST:
             return {
                ...state,
                postsArr: [
                    ...state.postsArr,
                    {
                        postId: "MyPost" + ++state.postsArr.length,
                        autorID: "",
                        text: action.newPostText,
                    },
                ],
                textareaValue: "",
            }
        default:
            return state;
    }
}

/* Санки */

export function createPostsComponentArrByArr(arr) {
    return dispatch => {
        return arr.map((item) => {
            return <Post text={item.text} key={item.postId}/>
        })
    }
}

