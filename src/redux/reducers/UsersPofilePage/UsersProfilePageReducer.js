const SET_USER_PAGE = "SET_USER_PAGE";
const TOGGLE_USER_PROFILE_IS_LOADED = "TOGGLE_USER_PROFILE_IS_LOADED";

export function setUsersPage(newUserObj) {
    return {
        type: SET_USER_PAGE,
        newUserObj,
    }
}

export function toggleUserProfileIsLoaded(userProfileIsLoaded) {
    return {
        type: TOGGLE_USER_PROFILE_IS_LOADED,
        userProfileIsLoaded,
    }
}

const initialState = {
    userObj: null,
    userProfileIsLoaded: false,
}


export default function UsersProfilePageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_PAGE:
            {
                return {
                    ...state,
                    userObj: action.newUserObj,
                }
            }
        case TOGGLE_USER_PROFILE_IS_LOADED:
            {
                return {
                    ...state,
                    userProfileIsLoaded: action.userProfileIsLoaded,
                }
            }
        default:
            return state;
    }
}