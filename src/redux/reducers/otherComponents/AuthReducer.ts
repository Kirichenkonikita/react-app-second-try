import { AuthorisedUserObjType, ProfileDataObjType } from './../../../generalObjectTypes/generalObjectTypes';
import { axiosRequestsObj } from "../../../api/axiosRequests";
// constants
const SET_CURRENT_AUTHORISED_USER_OBJ = `SET_CURRENT_AUTHORISED_USER_OBJ`;
const SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ = `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`;
const DISMOUNT_CURRENT_AUTHORISED_USER = `DISMOUNT_CURRENT_AUTHORISED_USER`;
const SET_CURRENT_AUTHORISED_USER_STATUS = `SET_CURRENT_AUTHORISED_USER_STATUS`;
// action creators
export function setCurrentAuthorisedUserStatus(newCurrentAuthorisedUserStatus: string) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_STATUS,
        newCurrentAuthorisedUserStatus,
    }
}

export function setCurrentAuthorisedUserObj(newCurrentAuthorisedUserObj: object) {
    return {
        type: SET_CURRENT_AUTHORISED_USER_OBJ,
        newCurrentAuthorisedUserObj,
    }
}

export function setCurrentAuthorisedUserProfileObj(newCurrentAuthorisedUserProfileObj: object) {
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
// action types
interface SetCurrentAuthorisedUserObjActionInterface {
    type: `SET_CURRENT_AUTHORISED_USER_OBJ`
    newCurrentAuthorisedUserStatus: string
}

interface SetCurrentAuthorisedUserObjActionInterface {
    type: `SET_CURRENT_AUTHORISED_USER_OBJ`
    newCurrentAuthorisedUserObj: AuthorisedUserObjType
}

interface SetCurrentAuthorisedUserProfileObjActionInterface {
    type: `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`
    newCurrentAuthorisedUserProfileObj: ProfileDataObjType
}

interface SetCurrentAuthorisedUserStatusInterface {
    type: `SET_CURRENT_AUTHORISED_USER_STATUS`
    newCurrentAuthorisedUserStatus: string
}

interface DismountCurrentAuthorisedUserInterface {
    type: `DISMOUNT_CURRENT_AUTHORISED_USER`
}

type SummarisedActionType =
    SetCurrentAuthorisedUserObjActionInterface
    | SetCurrentAuthorisedUserObjActionInterface
    | SetCurrentAuthorisedUserProfileObjActionInterface
    | SetCurrentAuthorisedUserStatusInterface
    | DismountCurrentAuthorisedUserInterface

const initialState = {
    isAuthorised: false as boolean,
    profileIsLoaded: false as boolean,
    currentAuthorisedUserObj: null as null | AuthorisedUserObjType,
    currentAuthorisedUserProfileObj: null as null | ProfileDataObjType,
    currentAuthorisedUserStatus: `` as string,
}
export type AuthReducerStateType = typeof initialState
// reducer itself
export default function AuthReducer(state: AuthReducerStateType = initialState, action: SummarisedActionType): AuthReducerStateType {
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
                ...state,
                isAuthorised: false,
                profileIsLoaded: false,
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
// thunks
export function setInStoreAuthorisedUserObjs(): Function {
    return (dispatch: Function) => {
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

export function setAuthorisedUserStatusByStr(str: string): Function {
    return (dispatch: Function) => {
        axiosRequestsObj.setAuthorisedUserStatusByStr(str)
            .then(isSuccessful => {
                isSuccessful && dispatch(setCurrentAuthorisedUserStatus(str))
            })
    }
}

export function authoriseUserByFormObj(formObj: any): Function {
    return (dispatch: Function) => {
        axiosRequestsObj.authoriseUserByFormObj(formObj)
            .then((result => {
                if (result.resultCode) {
                    console.log(result.messages[0])
                } else if (!result.resultCode) {
                    dispatch(setInStateAuthorisedUserObjById(result.data.userId))
                }
            }))
    }
}

export function setInStateAuthorisedUserObjById(userId: number) {
    return (dispatch: Function) => {
        axiosRequestsObj.getUserProfileDataObjById(userId)
            .then(ProfileDataObjType => {
                dispatch(setCurrentAuthorisedUserProfileObj(ProfileDataObjType))
            })

        axiosRequestsObj.getCurrentAuthorisedUserDataObj()
            .then(authorisedUserDataObj => {
                dispatch(setCurrentAuthorisedUserObj(authorisedUserDataObj))
            })
    }
}

export function logOutCurrentAuthorisedUser() {
    return (dispatch: Function) => {
        axiosRequestsObj.logOutCurrentAuthorisedUser()
            .then(isSuccessful => {
                if (isSuccessful) {
                    dispatch(dismountCurrentAuthorisedUser())
                }
            })
    }
}