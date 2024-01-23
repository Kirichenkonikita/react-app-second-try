const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_AMOUNT_DISPLAYED = "SET_USERS_AMOUNT_DISPLAYED";
const SET_CURRENT_ACTIVE_PAGE = "SET_CURRENT_ACTIVE_PAGE";
const SET_IS_LOADING = "SET_IS_LOADING";

export function setUsers (usersArr) {
    return {
        type: SET_USERS,
        usersArr,
    }
}
export function follow (id) {
    return {
        type: FOLLOW,
        id,
    }
}
export function unFollow (id) {
    return {
        type: UNFOLLOW,
        id,
    }
}
export function setTotalUsersAmount (totalUsersCount) {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount,
    }
}
export function setUsersAmountDisplayed (usersAmountDisplayed) {
    return {
        type: SET_USERS_AMOUNT_DISPLAYED,
        usersAmountDisplayed,
    }
}
export function setCurrentActivePage (currentActivePage) {
    return {
        type: SET_CURRENT_ACTIVE_PAGE,
        currentActivePage,
    }
}
export function setIsLoading (boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading: boolean,
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

    totalUsersCount: 0,
    usersAmountDisplayed: 3,
    pagesRequiredToDisplay: 1,
    currentActivePage: 5,
    pagesToDisplay: 3,
    isLoading: false,
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
        default:
            return state;
    }
}
