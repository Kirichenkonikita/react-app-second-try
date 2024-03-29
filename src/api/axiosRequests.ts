// imports
import axios from "axios"
import { AuthorisedUserObjType, ProfileDataObjType } from "../generalObjectTypes/generalObjectTypes";
// summarised axios requests object
export const axiosRequestsObj = {
    instance: axios.create({
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        withCredentials: true,
        headers: {
            "API-KEY": "dc906419-adef-444f-90e0-c043119c8e82",
        }
    }),

    getCurrentAuthorisedUserDataObj(): Promise<AuthorisedUserObjType> {
        return this.instance.get("auth/me")
            .then(response => {
                if (response.data.resultCode) {
                    return false
                } else if (!response.data.responseCode) {
                    return response.data.data
                }
            })
    },

    getUserProfileDataObjById(userId: number): Promise<ProfileDataObjType> {
        return this.instance.get(`profile/${userId}`)
            .then((response) => response.data)
    },

    getUsersObjByCountPageTerm(
        usersAmountDisplayed: number,
        currentActivePage: number,
        term?: number
    ) {
        let URL = `users`

        URL = URL
            + "?count="
            + usersAmountDisplayed
            + "&page="
            + currentActivePage;

        if (term) {
            URL = URL + "&term=" + term;
        }

        return this.instance.get(URL)
            .then(response => response.data)
    },

    followUserById(userId: number) {
        return this.instance.post(`follow/${userId}`)
            .then(response => !Boolean(response.data.responseCode))
    },

    unFollowUserById(userId: number) {
        return this.instance.delete(`follow/${userId}`)
            .then(response => !Boolean(response.data.responseCode))
    },

    getUserStatusStrById(userId: number) {
        return this.instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },

    setAuthorisedUserStatusByStr(str: string) {
        return this.instance.put(`/profile/status`, { status: str })
            .then(response => !Boolean(response.data.responseCode))
    },

    authoriseUserByFormObj(formObj: { email: string, password: string, rememberMe: boolean }) {
        return this.instance.post(`/auth/login`, formObj)
            .then(response => response.data)
    },

    logOutCurrentAuthorisedUser() {
        return this.instance.delete(`/auth/login`)
            .then(response => !Boolean(response.data.responseCode))
    }
};

