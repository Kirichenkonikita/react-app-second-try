const SET_USER_PAGE = "SET_USER_PAGE";

export function setUsersPage(newUserObj) {
    return {
        type: SET_USER_PAGE,
        newUserObj,
    }
}

const initialState = {
    userObj: null,
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
        default:
            return state;
    }
}