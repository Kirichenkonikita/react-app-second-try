const UPDATE_TEXTAREA_VALUE = "UPDATE_TEXTAREA_VALUE";
const ADD_POST = "ADD_POST";

export function updateTextareaValueAC(newValue) {
    return {
        type: UPDATE_TEXTAREA_VALUE,
        newValue,
    }
}

export function addPostAC() {
    return {
        type: ADD_POST,
    }
}

const initialMyPostsState = {
    textareaValue: "Привет, это мой первый пост!",
    postsArr: [],
};

function MyPosts(state = initialMyPostsState, action) {
    switch (action.type) {
        case UPDATE_TEXTAREA_VALUE:
            console.log(state);
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
                        text: state.textareaValue,
                    },
                ],
                textareaValue: "",
            }
        default:
            return state;
    }
}

export default MyPosts;