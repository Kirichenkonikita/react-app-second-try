import { axiosRequestsObj } from "../../../api/axiosRequests";

const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_AMOUNT_DISPLAYED = "SET_USERS_AMOUNT_DISPLAYED";
const SET_CURRENT_ACTIVE_PAGE = "SET_CURRENT_ACTIVE_PAGE";
const SET_IS_LOADING = "SET_IS_LOADING";
const TOGGLE_FOLLOWING_IN_PROCESS = "TOGGLE_FOLLOWING_IN_PROCESS";

export function setUsers(usersArr) {
    return {
        type: SET_USERS,
        usersArr,
    }
}
export function follow(id) {
    return {
        type: FOLLOW,
        id,
    }
}
export function unFollow(id) {
    return {
        type: UNFOLLOW,
        id,
    }
}
export function setTotalUsersAmount(totalUsersCount) {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount,
    }
}
export function setUsersAmountDisplayed(usersAmountDisplayed) {
    return {
        type: SET_USERS_AMOUNT_DISPLAYED,
        usersAmountDisplayed,
    }
}
export function setCurrentActivePage(currentActivePage) {
    return {
        type: SET_CURRENT_ACTIVE_PAGE,
        currentActivePage,
    }
}
export function setIsLoading(boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading: boolean,
    }
}

export function toggleFollowingInProcess(fetchingIsStarted, userIdFollowingProcessed) {
    return {
        type: TOGGLE_FOLLOWING_IN_PROCESS,
        fetchingIsStarted,
        userIdFollowingProcessed,
    }
}

const initialState = {
    usersArr: [
        {
            "name": "Leshen",
            "id": 30646,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        },
    ],
    initialisationFinished: false,
    totalUsersCount: 0,
    usersAmountDisplayed: 20,
    pagesRequiredToDisplay: 1,
    currentActivePage: 1,
    pagesToDisplay: 20,
    isLoading: false,
    usersIdsFollowingInProcessArr: [],
    possibleAmountUsersDisplayedArr: [5, 10, 20, 100],
};

export default function UsersReducer(state = initialState, action) {
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
                    newTotalUsersCount / state.usersAmountDisplayed
                );

                newPagesRequiredToDisplay > 10 ?
                    newPagesToDisplay = 10 :
                    newPagesToDisplay = newPagesRequiredToDisplay;


                return {
                    ...state,
                    totalUsersCount: newTotalUsersCount,
                    pagesRequiredToDisplay: newPagesRequiredToDisplay,
                    pagesToDisplay: newPagesToDisplay,
                }
            }
        case SET_USERS_AMOUNT_DISPLAYED:
            {
                let newPagesToDisplay = 0;
                let newUsersAmountDisplayed = action.usersAmountDisplayed;
                let newPagesRequiredToDisplay = Math.ceil(
                    state.totalUsersCount / newUsersAmountDisplayed
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
                    usersAmountDisplayed: newUsersAmountDisplayed,
                }
            }
        case SET_CURRENT_ACTIVE_PAGE:
            {
                return {
                    ...state,
                    currentActivePage: action.currentActivePage,
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
// Санки
export const UsersThunks = {
    followUserById(userId) {
        return dispatch => {
            dispatch(toggleFollowingInProcess(true, userId))
            axiosRequestsObj.followUserById(userId)
                .then(isSuccessful => {
                    if (isSuccessful) {
                        dispatch(follow(userId))
                        dispatch(toggleFollowingInProcess(false, userId))
                    }
                })
        }
    },

    unFollowUserById(userId) {
        return dispatch => {
            dispatch(toggleFollowingInProcess(true, userId))
            axiosRequestsObj.unFollowUserById(userId)
                .then(isSuccessful => {
                    if (isSuccessful) {
                        dispatch(unFollow(userId))
                        dispatch(toggleFollowingInProcess(false, userId))
                    }
                })
        }
    },

    reloadUsersArrayByCountPageTerm(
        usersAmountDisplayed,
        currentActivePage,
        term
    ) {
        return dispatch => {
            dispatch(setIsLoading(true))
            axiosRequestsObj.getUsersObjByCountPageTerm(usersAmountDisplayed, currentActivePage, term)
                .then(usersObj => {
                    if (usersObj.error) alert(usersObj.error)
                    dispatch(setTotalUsersAmount(usersObj.totalCount))
                    dispatch(setUsers(usersObj.items))
                    dispatch(setIsLoading(false))
                })
        }
    },

    changeActivePageByInt(
        newActivePage,
        usersStateAmountDisplayed,
    ) {
        return dispatch => {
            dispatch(setCurrentActivePage(newActivePage));

            dispatch(UsersThunks.reloadUsersArrayByCountPageTerm(
                usersStateAmountDisplayed,
                newActivePage
            ))
        }
    },

    сhangeAmountDisplayedByInt(
        usersNewAmountDisplayed,
        currentStateActivePage
    ) {
        return dispatch => {
            dispatch(setUsersAmountDisplayed(usersNewAmountDisplayed))
            dispatch(UsersThunks.reloadUsersArrayByCountPageTerm(
                usersNewAmountDisplayed,
                currentStateActivePage
            ))
        }
    },

    mapArrToUsersPerPageButtonsArr(
        arr,
        classNameObj,
        stateUsersAmountDisplayed,
        stateCurrentActivePage
    ) {
        return dispatch => {
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
        pagesToDisplay,
        currentActivePage,
        classNameObj,
        stateUsersAmountDisplayed
    ) {
        return dispatch => {
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