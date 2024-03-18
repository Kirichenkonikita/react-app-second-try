import axios from "axios"
/* axiosRequest все возвращают нужные значения, обёрнутые промисами */

export const axiosRequestsObj = {
    instance: axios.create({
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        withCredentials: true,
        headers: {
            "API-KEY": "dc906419-adef-444f-90e0-c043119c8e82",
        }
    }),

    getCurrentAuthorisedUserDataObj() {
        return this.instance.get("auth/me")
            .then(response => {
                if (response.data.resultCode) {
                    return false
                } else if (!response.data.responseCode) {
                    return response.data.data
                }
            })
    },

    getUserProfileDataObjById(userId) {
        return this.instance.get(`profile/${userId}`)
            .then((response) => response.data)
    },

    getUsersObjByCountPageTerm(usersAmountDisplayed, currentActivePage, term) {
        let URL = `users`

        URL = URL
            + "?count="
            + usersAmountDisplayed
            + "&page="
            + currentActivePage;

        if (term) {
            URL = URL + "&term=" + this.term;
        }

        return this.instance.get(URL)
            .then(response => response.data)
    },

    followUserById(userId) {
        return this.instance.post(`follow/${userId}`)
            .then(response => !Boolean(response.data.responseCode))
    },

    unFollowUserById(userId) {
        return this.instance.delete(`follow/${userId}`)
            .then(response => !Boolean(response.data.responseCode))
    },

    getUserStatusStrById(userId) {
        return this.instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },

    setAuthorisedUserStatusByStr(str) {
        return this.instance.put(`/profile/status`, { status: str })
            .then(response => !Boolean(response.data.responseCode))
    },

    authoriseUserByFormObj(formObj) {
        return this.instance.post(`/auth/login`, formObj)
            .then(response => response.data)
    },

    logOutCurrentAuthorisedUser() {
        return this.instance.delete(`/auth/login`)
            .then(response => !Boolean(response.data.responseCode))
    }
};

