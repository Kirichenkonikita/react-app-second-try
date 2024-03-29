import Post from "../../../../components/main/Profile/MyPosts/Post/Post";
import { GetActionsTypesFromActionCreatorObject } from "../../../../api/getActionTypesFromACObject"
import { MyPostsType } from "../../../../generalObjectTypes/generalObjectTypes"

// constants

const ADD_POST = "ADD_POST";

// action creator & its type

export const myPostsActionCreatorsObj = {
    addNewPost: (newPostText: string) => {
        return {
            type: ADD_POST,
            newPostText
        }
    }
}

type ActionTypes = GetActionsTypesFromActionCreatorObject<typeof myPostsActionCreatorsObj>

// initial state & its type

const initialState = {
    textareaValue: `` as string,
    postsArr: [] as Array<MyPostsType>,
}

type InitialStateType = typeof initialState

// reducer itself

export default function MyPostsReducer(state: InitialStateType = initialState, action: ActionTypes): InitialStateType {
    switch (action.type) {
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

// thunks

export const MyPostsThunksObj = {
    createPostsComponentArrByArr(arr: Array<MyPostsType>) {
        return (dispatch: any) => {
            return arr.map((item: MyPostsType) => {
                return <Post text={item.text} key={item.postId} />
            })
        }
    }
}
