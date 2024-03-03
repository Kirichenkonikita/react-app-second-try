import axios from "axios"

let exemplarObj = {
    resoursePath: `str`,
    queryOption1Str: `str`,
    queryOption2Str: `str`,
    queryOption3Str: `str`,
}
class AxiosRequest {
    constructor(optionsObj) {
        this.resoursePath = optionsObj.resoursePath;
        this.queryOption1Str = optionsObj.queryOption1Str;
        this.queryOption2Str = optionsObj.queryOption2Str;
        this.queryOption3Str = optionsObj.queryOption3Str;
        this.axiosInstance = this.createAxiosInstance();
    }

    createAxiosInstance() {
        return axios.create({
            baseURL: `https://social-network.samuraijs.com/api/1.0/${this.resoursePath}`,
            withCredentials: true,
            headers: {
                "API-KEY": "dc906419-adef-444f-90e0-c043119c8e82",
            },
        })
    }
    makeRequest(resoursePathValue) {
        return this.axiosInstance.get(`/${resoursePathValue}`).then(response => response.data);
    }
}

class AxiosRequestWithQueryOptions extends AxiosRequest {
    makeRequest(queryValue1, queryValue2, queryValue3) {
        let queryTotalQueryOptionsStr;

        if (queryValue1 || queryValue2 || queryValue2) {
            queryTotalQueryOptionsStr = `?`
        }
        if (queryValue1) {
            queryTotalQueryOptionsStr = queryTotalQueryOptionsStr
                + this.queryOption1Str
                + "="
                + queryValue1
                + "/"
        }
        if (queryValue2) {
            queryTotalQueryOptionsStr = queryTotalQueryOptionsStr
                + this.queryOption2Str
                + "="
                + queryValue2
                + "/"
        }
        if (queryValue3) {
            queryTotalQueryOptionsStr = queryTotalQueryOptionsStr
                + this.queryOption3Str
                + "="
                + queryValue3
                + "/"
        }

        return this.axiosInstance.get(queryTotalQueryOptionsStr).then(response => response.data);
    }
}
export const AuthAxiosRequest = new AxiosRequest({ resoursePath: `auth`, });

export const UsersAxiosRequestObj = new AxiosRequestWithQueryOptions({
    resoursePath: `users`,
    queryOption1Str: `count`,
    queryOption2Str: `page`,
    queryOption3Str: `term`,
});

export const ProfileAxiosRequestObj = new AxiosRequest({
    resoursePath: `profile`,
})




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
                return response.data.data
            })
    },
    getUserProfileDataObjById(userId) {
        return this.instance.get(`profile/${userId}`)
            .then((result) => result.data)
    },
    followUserById(userId) {
        return this.instance.post(`follow/${userId}`)
        .then(result => !Boolean(result.data.resultCode))
    },
    unFollowUserById(userId) {
        return this.instance.delete(`follow/${userId}`)
        .then(result => !Boolean(result.data.resultCode))
    },
};

