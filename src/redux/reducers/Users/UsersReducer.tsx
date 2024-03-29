import { axiosRequestsObj } from "../../../api/axiosRequests";
import { GetActionsTypesFromActionCreatorObject } from "../../../api/getActionTypesFromACObject";
import { UsersPageUserObjType } from "../../../generalObjectTypes/generalObjectTypes";
// constants
const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_AMOUNT_DISPLAYED = "SET_USERS_AMOUNT_DISPLAYED";
const SET_CURRENT_ACTIVE_PAGE = "SET_CURRENT_ACTIVE_PAGE";
const SET_IS_LOADING = "SET_IS_LOADING";
const TOGGLE_FOLLOWING_IN_PROCESS = "TOGGLE_FOLLOWING_IN_PROCESS";
// action creators object & its type
export const UsersActionCreatorsObj = {
    setUsers(usersArr: Array<UsersPageUserObjType>) {
        return {
            type: SET_USERS,
            usersArr,
        } as const
    },
    follow(id: number) {
        return {
            type: FOLLOW,
            id,
        } as const
    },
    unFollow(id: number) {
        return {
            type: UNFOLLOW,
            id,
        } as const
    },
    setTotalUsersAmount(totalUsersCount: number | string) {
        return {
            type: SET_TOTAL_USERS_COUNT,
            totalUsersCount,
        } as const
    },
    setUsersAmountDisplayed(usersAmountDisplayed: number | string) {
        return {
            type: SET_USERS_AMOUNT_DISPLAYED,
            usersAmountDisplayed,
        } as const
    },
    setCurrentActivePage(currentActivePage: number | string) {
        return {
            type: SET_CURRENT_ACTIVE_PAGE,
            currentActivePage,
        } as const
    },
    setIsLoading(boolean: boolean) {
        return {
            type: SET_IS_LOADING,
            isLoading: boolean,
        } as const
    },
    toggleFollowingInProcess(
        fetchingIsStarted: boolean,
        userIdFollowingProcessed: number
    ) {
        return {
            type: TOGGLE_FOLLOWING_IN_PROCESS,
            fetchingIsStarted,
            userIdFollowingProcessed,
        } as const
    },
}
type UsersActionTypes = GetActionsTypesFromActionCreatorObject<typeof UsersActionCreatorsObj>
// initial state & its type
const initialState = {
    usersArr: [] as Array<UsersPageUserObjType>,
    isLoading: false,
    initialisationFinished: false,
    totalUsersCount: 0,
    usersAmountDisplayed: 20,
    pagesRequiredToDisplay: 1,
    currentActivePage: 1,
    pagesToDisplay: 20,
    usersIdsFollowingInProcessArr: [] as Array<number>,
    possibleAmountUsersDisplayedArr: [5, 10, 20, 100],
};
type UsersStateType = typeof initialState
// reducer itself
export default function UsersReducer(
    state: UsersStateType = initialState,
    action: UsersActionTypes
): UsersStateType {
    switch (action.type) {
        case SET_USERS:
            {
                return {
                    ...state,
                    usersArr: [...action.usersArr],
                }
            }
        case FOLLOW:
            {
                const newUserArr = state.usersArr.map(
                    user => {
                        if (user.id === action.id) {
                            return {
                                ...user,
                                followed: true,
                            }
                        } else {
                            return user;
                        }
                    }
                )
                return {
                    ...state,
                    usersArr: newUserArr,
                };
            }
        case UNFOLLOW:
            {
                const newUserArr = state.usersArr.map(
                    user => {
                        if (user.id === action.id) {
                            return {
                                ...user,
                                followed: false,
                            }
                        } else {
                            return user;
                        }
                    }
                )
                return {
                    ...state,
                    usersArr: newUserArr,
                };
            }
        case SET_TOTAL_USERS_COUNT:
            {
                let newTotalUsersCount = action.totalUsersCount;
                let newPagesToDisplay = 0;
                let newPagesRequiredToDisplay = Math.ceil(
                    +newTotalUsersCount / state.usersAmountDisplayed
                );

                newPagesRequiredToDisplay > 10 ?
                    newPagesToDisplay = 10 :
                    newPagesToDisplay = newPagesRequiredToDisplay;


                return {
                    ...state,
                    totalUsersCount: +newTotalUsersCount,
                    pagesRequiredToDisplay: newPagesRequiredToDisplay,
                    pagesToDisplay: newPagesToDisplay,
                }
            }
        case SET_USERS_AMOUNT_DISPLAYED:
            {
                let newPagesToDisplay = 0;
                let newUsersAmountDisplayed = action.usersAmountDisplayed;
                let newPagesRequiredToDisplay = Math.ceil(
                    state.totalUsersCount / +newUsersAmountDisplayed
                )
                if (newPagesRequiredToDisplay === state.pagesRequiredToDisplay) {
                    return state
                } else if (newPagesRequiredToDisplay > 10) {
                    newPagesToDisplay = 10;
                }

                return {
                    ...state,
                    pagesRequiredToDisplay: newPagesRequiredToDisplay,
                    pagesToDisplay: newPagesToDisplay,
                    usersAmountDisplayed: +newUsersAmountDisplayed,
                }
            }
        case SET_CURRENT_ACTIVE_PAGE:
            {
                return {
                    ...state,
                    currentActivePage: +action.currentActivePage,
                }
            }
        case SET_IS_LOADING:
            {
                return {
                    ...state,
                    isLoading: action.isLoading,
                }
            }
        case TOGGLE_FOLLOWING_IN_PROCESS:
            {
                return {
                    ...state,
                    usersIdsFollowingInProcessArr: action.fetchingIsStarted
                        ? [...state.usersIdsFollowingInProcessArr, action.userIdFollowingProcessed]
                        : state.usersIdsFollowingInProcessArr.filter(userId => userId !== action.userIdFollowingProcessed)
                }
            }

        default:
            return state;
    }
}
// thunks
export const UsersThunks = {
    followUserById(userId: number) {
        return (dispatch: any) => {
            dispatch(UsersActionCreatorsObj.toggleFollowingInProcess(true, userId))
            axiosRequestsObj.followUserById(userId)
                .then(isSuccessful => {
                    if (isSuccessful) {
                        dispatch(UsersActionCreatorsObj.follow(userId))
                        dispatch(UsersActionCreatorsObj.toggleFollowingInProcess(false, userId))
                    }
                })
        }
    },
    unFollowUserById(userId: number) {
        return (dispatch: any) => {
            dispatch(UsersActionCreatorsObj.toggleFollowingInProcess(true, userId))
            axiosRequestsObj.unFollowUserById(userId)
                .then(isSuccessful => {
                    if (isSuccessful) {
                        dispatch(UsersActionCreatorsObj.unFollow(userId))
                        dispatch(UsersActionCreatorsObj.toggleFollowingInProcess(false, userId))
                    }
                })
        }
    },
    reloadUsersArrayByCountPageTerm(
        usersAmountDisplayed: number,
        currentActivePage: number,
        term?: number
    ) {
        return (dispatch: any) => {
            dispatch(UsersActionCreatorsObj.setIsLoading(true))
            axiosRequestsObj.getUsersObjByCountPageTerm(usersAmountDisplayed, currentActivePage, term)
                .then(usersObj => {
                    if (usersObj.error) alert(usersObj.error)
                    dispatch(UsersActionCreatorsObj.setTotalUsersAmount(usersObj.totalCount))
                    dispatch(UsersActionCreatorsObj.setUsers(usersObj.items))
                    dispatch(UsersActionCreatorsObj.setIsLoading(false))
                })
        }
    },
    changeActivePageByInt(
        newActivePage: number,
        usersStateAmountDisplayed: number,
    ) {
        return (dispatch: any) => {
            dispatch(UsersActionCreatorsObj.setCurrentActivePage(newActivePage));

            dispatch(UsersThunks.reloadUsersArrayByCountPageTerm(
                usersStateAmountDisplayed,
                newActivePage
            ))
        }
    },
    сhangeAmountDisplayedByInt(
        usersNewAmountDisplayed: number,
        currentStateActivePage: number
    ) {
        return (dispatch: any) => {
            dispatch(UsersActionCreatorsObj.setUsersAmountDisplayed(usersNewAmountDisplayed))
            dispatch(UsersThunks.reloadUsersArrayByCountPageTerm(
                usersNewAmountDisplayed,
                currentStateActivePage
            ))
        }
    },
    mapArrToUsersPerPageButtonsArr(
        arr: Array<number>,
        classNameObj: any,
        stateUsersAmountDisplayed: number,
        stateCurrentActivePage: number
    ) {
        return (dispatch: any) => {
            return arr.map(usersAmountDisplayed => {
                let className;

                stateUsersAmountDisplayed === usersAmountDisplayed
                    ? className = classNameObj.activeAmountSwitcherButton
                    : className = classNameObj.unActiveAmountSwitcherButton

                return (
                    <div onClick={() => {
                        dispatch(UsersThunks.сhangeAmountDisplayedByInt(
                            usersAmountDisplayed,
                            stateCurrentActivePage
                        )
                        )
                    }
                    }
                        className={className}
                        key={"usersSwitcher" + usersAmountDisplayed}>
                        {usersAmountDisplayed}
                    </div>
                )
            })
        }
    },
    createPageButtonsArrByPagesToDisplay(
        pagesToDisplay: number,
        currentActivePage: number,
        classNameObj: any,
        stateUsersAmountDisplayed: number
    ) {
        return (dispatch: any) => {
            let pagesArr = [];

            for (let i = 1; i <= pagesToDisplay; i++) {
                pagesArr.push(i);
            }

            return pagesArr.map(item => {
                return (
                    <div
                        className={classNameObj.pageSwitcher}
                        key={"pagesSwitcher" + item}
                    >
                        <p className={
                            item === currentActivePage
                                ? classNameObj.activePage
                                : classNameObj.unActivePage
                        }
                            onClick={
                                () => {
                                    dispatch(UsersThunks.changeActivePageByInt(
                                        item,
                                        stateUsersAmountDisplayed
                                    ))
                                }
                            }
                        >
                            {item}
                        </p>
                    </div>
                )
            })
        }
    }
}