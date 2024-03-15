import { axiosRequestsObj } from "../../../api/axiosRequests";

const SET_CURRENT_AUTHORISED_USER_OBJ = `SET_CURRENT_AUTHORISED_USER_OBJ`;
const SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ = `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`;
const LOGOUT_CURRENT_AUTHORISED_USER = `LOGOUT_CURRENT_AUTHORISED_USER`;
const SET_CURRENT_AUTHORISED_USER_STATUS = `SET_CURRENT_AUTHORISED_USER_STATUS`

export function setCurrentAuthorisedUserStatus(newCurrentAuthorisedUserStatus) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_STATUS,
        newCurrentAuthorisedUserStatus,
    }
}

export function setCurrentAuthorisedUserObj(newCurrentAuthorisedUserObj) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_OBJ,
        newCurrentAuthorisedUserObj,
    }
}

export function setCurrentAuthorisedUserProfileObj(newCurrentAuthorisedUserProfileObj) {
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
    currentAuthorisedUserObj: null,
    isAuthorised: false,
    profileIsLoaded: false,
    currentAuthorisedUserProfileObj: null,
    currentAuthorisedUserStatus: ``,
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
        case SET_CURRENT_AUTHORISED_USER_STATUS:
            {
                return {
                    ...state,
                    currentAuthorisedUserStatus: action.newCurrentAuthorisedUserStatus,
                }
            }
        default:
            return state;
    }
}

export function setInStoreAuthorisedUserObjs() {
    return dispatch => {
        axiosRequestsObj.getCurrentAuthorisedUserDataObj()
            .then(authorisedUserDataObj => {
                dispatch(setCurrentAuthorisedUserObj(authorisedUserDataObj));
                axiosRequestsObj.getUserProfileDataObjById(authorisedUserDataObj.id)
                    .then(userProfileDataObj => {
                        dispatch(setCurrentAuthorisedUserProfileObj(userProfileDataObj))
                        
                        return userProfileDataObj.userId
                    })
                    .then(userId => axiosRequestsObj.getUserStatusStrById(userId))
                        .then(statusStr => dispatch(setCurrentAuthorisedUserStatus(statusStr)))
            })
    }
}

export function setAuthorisedUserStatusByStr(str) {
    return dispatch => {
        axiosRequestsObj.setAuthorisedUserStatusByStr(str)
        .then(isSuccessful => dispatch(setCurrentAuthorisedUserStatus(str)))
    }
}