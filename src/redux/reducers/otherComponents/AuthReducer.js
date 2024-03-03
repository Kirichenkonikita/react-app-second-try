import { axiosRequestsObj } from "../../../api/axiosRequests";

const SET_CURRENT_AUTHORISED_USER_OBJ = `SET_CURRENT_AUTHORISED_USER_OBJ`;
const SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ = `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`;
const LOGOUT_CURRENT_AUTHORISED_USER = `LOGOUT_CURRENT_AUTHORISED_USER`;


export function createActionSetCurrentAuthorisedUserObj(newCurrentAuthorisedUserObj) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_OBJ,
        newCurrentAuthorisedUserObj,
    }
}
export function createActionSetCurrentAuthorisedUserProfileObj(newCurrentAuthorisedUserProfileObj) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ,
        newCurrentAuthorisedUserProfileObj,
    }
}
export function logoutCurrentAuthorisedUser() {
    return {
        type: LOGOUT_CURRENT_AUTHORISED_USER,
    }
}

const initialState = {
    isAuthorised: false,
    profileIsLoaded: false,
    currentAuthorisedUserProfileObj: null,
    currentAuthorisedUserObj: null,
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_AUTHORISED_USER_OBJ:
            {
                let isAuthorised = false;

                if (action.newCurrentAuthorisedUserObj) {
                    isAuthorised = true;
                }
                return {
                    ...state,
                    isAuthorised,
                    currentAuthorisedUserObj: action.newCurrentAuthorisedUserObj,
                }
            }
        case SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ:
            let profileIsLoaded = false;

            if (action.newCurrentAuthorisedUserProfileObj) {
                profileIsLoaded = true;
            }
            return {
                ...state,
                profileIsLoaded,
                currentAuthorisedUserProfileObj: action.newCurrentAuthorisedUserProfileObj,
            }
        case LOGOUT_CURRENT_AUTHORISED_USER:
            return {
                isAuthorised: false,
                currentAuthorisedUserProfileObj: null,
                currentAuthorisedUserObj: null,
            }
        default:
            return state;
    }
}

export function setInStoreAuthorisedUserObjs() {
    return dispatch => {
        axiosRequestsObj.getCurrentAuthorisedUserDataObj()
            .then(authorisedUserDataObj => {
                dispatch(createActionSetCurrentAuthorisedUserObj(authorisedUserDataObj));
                axiosRequestsObj.getUserProfileDataObjById(authorisedUserDataObj.id)
                .then(userProfileDataObj => dispatch(createActionSetCurrentAuthorisedUserProfileObj(userProfileDataObj)));
            })
    }
}
