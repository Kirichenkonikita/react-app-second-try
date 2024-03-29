// myPosts component > Post component 
export type MyPostsType = {
    postId: string,
    autorID: string,
    text: string,
}
// responses from server
export type AuthorisedUserObjType = {
    id: number
    email: string
    login: string
}

export type ProfileDataObjType = {
    "aboutMe": null | string
    "contacts": {
        "facebook": null | string
        "website": null | string
        "vk": null | string
        "twitter": null | string
        "instagram": null | string
        "youtube": null | string
        "github": null | string
        "mainLink": null | string
    },
    "lookingForAJob": boolean
    "lookingForAJobDescription": null | string
    "fullName": | string
    "userId": number
    "photos": {
        "small": null | string
        "large": null | string
    }
}

export type UsersPageUserObjType = {
    "name": string
    "id": number
    "photos": {
        "small": null | string
        "large": null | string
    }
    "status": null | string
    "followed": boolean
}