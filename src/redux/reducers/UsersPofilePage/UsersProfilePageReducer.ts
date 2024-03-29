import { ProfileDataObjType } from './../../../generalObjectTypes/generalObjectTypes';
import { axiosRequestsObj } from "../../../api/axiosRequests";
import { GetActionsTypesFromActionCreatorObject } from '../../../api/getActionTypesFromACObject';

// constants

const SET_USER_PAGE = "SET_USER_PAGE";
const TOGGLE_USER_PROFILE_IS_LOADED = "TOGGLE_USER_PROFILE_IS_LOADED";

// action creator object & its type

export const UsersProfilePageActionCreatorsObj = {
    setUsersPage(newUserObj: ProfileDataObjType) {
        return {
            type: SET_USER_PAGE,
            newUserObj,
        }
    },

    toggleUserProfileIsLoaded(userProfileIsLoaded: boolean) {
        return {
            type: TOGGLE_USER_PROFILE_IS_LOADED,
            userProfileIsLoaded,
        }
    }
}

type ActionTypes = GetActionsTypesFromActionCreatorObject<typeof UsersProfilePageActionCreatorsObj>

// initial state & its type

const initialState = {
    userObj: null as null | ProfileDataObjType,
    userProfileIsLoaded: false as boolean,
}

type UsersProfilePageStateType = typeof initialState

// reducer itself

export default function UsersProfilePageReducer(state: UsersProfilePageStateType = initialState, action: ActionTypes): UsersProfilePageStateType {
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

export const UserProfilePageThunksObj = {
    setUserProfileObjInState(userId) {
        return dispatch => {
            dispatch(UsersProfilePageActionCreatorsObj.toggleUserProfileIsLoaded(false))
            axiosRequestsObj.getUserProfileDataObjById(userId)
                .then(userObj => {
                    dispatch(UsersProfilePageActionCreatorsObj.setUsersPage(userObj))
                    dispatch(UsersProfilePageActionCreatorsObj.toggleUserProfileIsLoaded(true))
                })
        }
    }
}