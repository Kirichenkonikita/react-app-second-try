import axios from "axios";

const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW"

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
}

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
        default:
            return state;
    }
}
