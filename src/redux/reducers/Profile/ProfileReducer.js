const SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ = `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`;

export function setCurrentAuthorisedUserProfileObjAC(newCurrentAuthorisedUserProfileObj) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ,
        newCurrentAuthorisedUserProfileObj,
    }
}

const initialState = {
    isAuthorised: false,
    currentAuthorisedUserProfileObj: null,
}

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ:
            {
                return {
                    ...state,
                    isAuthorised: true,
                    currentAuthorisedUserProfileObj: action.newCurrentAuthorisedUserProfileObj,
                }
            }
        default:
            return state;
    }
}