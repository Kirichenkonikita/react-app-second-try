import { axiosRequestsObj } from "../../../api/axiosRequests";

const SET_CURRENT_AUTHORISED_USER_OBJ = `SET_CURRENT_AUTHORISED_USER_OBJ`;
const SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ = `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`;
const DISMOUNT_CURRENT_AUTHORISED_USER = `DISMOUNT_CURRENT_AUTHORISED_USER`;
const SET_CURRENT_AUTHORISED_USER_STATUS = `SET_CURRENT_AUTHORISED_USER_STATUS`;


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

export function dismountCurrentAuthorisedUser() {
    return {
        type: DISMOUNT_CURRENT_AUTHORISED_USER,
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
        case DISMOUNT_CURRENT_AUTHORISED_USER:
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
                if (!authorisedUserDataObj) return

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
            .then(isSuccessful => {
                isSuccessful && dispatch(setCurrentAuthorisedUserStatus(str))
            })
    }
}

export function authoriseUserByFormObj(formObj) {
    return dispatch => {
        axiosRequestsObj.authoriseUserByFormObj(formObj)
            .then((result => {
                if (result.resultCode) {
                    alert(result.messages[0])
                } else if (!result.resultCode) {
                    console.log(result)
                    dispatch(setInStateAuthorisedUserObjById(result.data.userId))
                }
            }))
    }
}

export function setInStateAuthorisedUserObjById(userId) {
    return dispatch => {
        axiosRequestsObj.getUserProfileDataObjById(userId)
            .then(profileDataObj => {
                dispatch(setCurrentAuthorisedUserProfileObj(profileDataObj))
            })

        axiosRequestsObj.getCurrentAuthorisedUserDataObj(userId)
            .then(authorisedUserDataObj => {
                dispatch(setCurrentAuthorisedUserObj(authorisedUserDataObj))
            })
    }
}