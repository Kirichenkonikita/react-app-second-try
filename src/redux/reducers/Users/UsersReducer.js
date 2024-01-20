const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_AMOUNT_DISPLAYED = "SET_USERS_AMOUNT_DISPLAYED";
const SET_CURRENT_ACTIVE_PAGE = "SET_CURRENT_ACTIVE_PAGE";

export function setUsersAC(usersArr) {
    return {
        type: SET_USERS,
        usersArr,
    }
}
export function followAC(id) {
    return {
        type: FOLLOW,
        id,
    }
}
export function unFollowAC(id) {
    return {
        type: UNFOLLOW,
        id,
    }
}
export function setTotalUsersAmountAC(totalUsersCount) {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount,
    }
}
export function setUsersAmountDisplayedAC(usersAmountDisplayed) {
    return {
        type: SET_USERS_AMOUNT_DISPLAYED,
        usersAmountDisplayed,
    }
}
export function setCurrentActivePageAC(currentActivePage) {
    return {
        action: SET_CURRENT_ACTIVE_PAGE,
        currentActivePage,
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

    _totalUsersCount: 0,
    _usersAmountDisplayed: 10,
    pagesRequiredToDisplay: 1,
    currentActivePage: 1,
    pagesToDisplay: 3,

    set totalUsersCount(totalUsersCount) {
        this._totalUsersCount = totalUsersCount;
        this.pagesRequiredToDisplay = Math.ceil(
            this._totalUsersCount / this._usersDisplayedOnPage
        );
        this.pagesRequiredToDisplay > 10 ?
            this.pagesToDisplay = 10 :
            this.pagesToDisplay = this.pagesRequiredToDisplay;
    },
    get totalUsersCount() {
        return this._totalUsersCount;
    },

    set usersAmountDisplayed(usersAmountDisplayed) {
        this.usersAmountDisplayed = usersAmountDisplayed;
        this._totalUsersCount = Math.ceil(
            this._totalUsersCount / this.usersAmountDisplayed
        )
        this.pagesRequiredToDisplay > 10 ?
            this.pagesToDisplay = 10 :
            this.pagesToDisplay = this.pagesRequiredToDisplay;
    },
    get usersAmountDisplayed() {
        return this._usersAmountDisplayed;
    }

};

export default function UsersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            {
                return {
                    ...state,
                    usersArr: action.usersArr,
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
                const newState = { ...state };
                newState.totalUsersCount = action.totalUsersCount;
                return newState;
            }
        case SET_USERS_AMOUNT_DISPLAYED:
            {
                const newState = { ...state };
                newState.usersAmountDisplayed = action.usersAmountDisplayed;
                return newState;
            }
        case SET_CURRENT_ACTIVE_PAGE:
            {
                return {
                    ...state,
                    currentActivePage: action.currentActivePage,
                }
            }
        default:
            return state;
    }
}
