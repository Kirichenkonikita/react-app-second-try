import { AuthorisedUserObjType, ProfileDataObjType } from './../../../generalObjectTypes/generalObjectTypes';
import { axiosRequestsObj } from "../../../api/axiosRequests";
import { GetActionsTypesFromActionCreatorObject } from '../../../api/getActionTypesFromACObject';
// constants
const SET_CURRENT_AUTHORISED_USER_OBJ = `SET_CURRENT_AUTHORISED_USER_OBJ`;
const SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ = `SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ`;
const DISMOUNT_CURRENT_AUTHORISED_USER = `DISMOUNT_CURRENT_AUTHORISED_USER`;
const SET_CURRENT_AUTHORISED_USER_STATUS = `SET_CURRENT_AUTHORISED_USER_STATUS`;
// action creator object
export const AuthActionCreatorsObj = {
    setCurrentAuthorisedUserStatus(newCurrentAuthorisedUserStatus: string) {
        return {
            type: SET_CURRENT_AUTHORISED_USER_STATUS,
            newCurrentAuthorisedUserStatus,
        } as const
    },
    setCurrentAuthorisedUserObj(newCurrentAuthorisedUserObj: AuthorisedUserObjType) {
        return {
            type: SET_CURRENT_AUTHORISED_USER_OBJ,
            newCurrentAuthorisedUserObj,
        } as const
    },
    setCurrentAuthorisedUserProfileObj(newCurrentAuthorisedUserProfileObj: ProfileDataObjType) {
        return {
            type: SET_CURRENT_AUTHORISED_USER_PROFILE_OBJ,
            newCurrentAuthorisedUserProfileObj,
        } as const
    },
    dismountCurrentAuthorisedUser() {
        return {
            type: DISMOUNT_CURRENT_AUTHORISED_USER,
        } as const
    },
}
type ActionTypes = GetActionsTypesFromActionCreatorObject<typeof AuthActionCreatorsObj>
// initial state
const initialState = {
    isAuthorised: false as boolean,
    profileIsLoaded: false as boolean,
    currentAuthorisedUserObj: null as null | AuthorisedUserObjType,
    currentAuthorisedUserProfileObj: null as null | ProfileDataObjType,
    currentAuthorisedUserStatus: `` as string,
}
export type AuthReducerStateType = typeof initialState
// reducer itself
export default function AuthReducer(
    state: AuthReducerStateType = initialState,
    action: ActionTypes
): AuthReducerStateType {
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

                dispatch(AuthActionCreatorsObj.setCurrentAuthorisedUserObj(authorisedUserDataObj));

                axiosRequestsObj.getUserProfileDataObjById(authorisedUserDataObj.id)
                    .then(userProfileDataObj => {
                        dispatch(AuthActionCreatorsObj.setCurrentAuthorisedUserProfileObj(userProfileDataObj))

                        return userProfileDataObj.userId
                    })
                    .then(userId => axiosRequestsObj.getUserStatusStrById(userId))
                    .then(statusStr => dispatch(AuthActionCreatorsObj.setCurrentAuthorisedUserStatus(statusStr)))
            })
    }
}

export function setAuthorisedUserStatusByStr(str: string): Function {
    return (dispatch: Function) => {
        axiosRequestsObj.setAuthorisedUserStatusByStr(str)
            .then(isSuccessful => {
                isSuccessful && dispatch(AuthActionCreatorsObj.setCurrentAuthorisedUserStatus(str))
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
                dispatch(AuthActionCreatorsObj.setCurrentAuthorisedUserProfileObj(ProfileDataObjType))
            })

        axiosRequestsObj.getCurrentAuthorisedUserDataObj()
            .then(authorisedUserDataObj => {
                dispatch(AuthActionCreatorsObj.setCurrentAuthorisedUserObj(authorisedUserDataObj))
            })
    }
}

export function logOutCurrentAuthorisedUser() {
    return (dispatch: Function) => {
        axiosRequestsObj.logOutCurrentAuthorisedUser()
            .then(isSuccessful => {
                if (isSuccessful) {
                    dispatch(AuthActionCreatorsObj.dismountCurrentAuthorisedUser())
                }
            })
    }
}