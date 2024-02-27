import React from "react";
import classNameObj from "./UsersProfilePage.module.css";
import SocialMediaIcon from "./../../otherComponents/SocialMediaIcon/SocialMediaIcon";
import Preloader from "../../otherComponents/Preloader/Preloader";

export default function UsersProfilePage(props) {
    if (!props.userObjIsLoaded) {
        return <Preloader />;
    }

    return (
        <div className={classNameObj.UsersProfilePageContainer}>
            <h1>{props.fullName}</h1>
            <img src={props.photos.large} alt="Аватарка пользователя" />
            <div>
                <p>{props.aboutMe}</p>
                <p>{props.lookingForAJob
                    ? "В поисках работы"
                    : "Работу не ищу, и не собираюсь"}</p>
                <p>{props.lookingForAJob
                    ? false
                    : props.lookingForAJobDescription}</p>
                <p>Мой вебсайт: {props.website}</p>
                <button> test button </button>
            </div>
            <div className={classNameObj.SocialMediaIconContainer}>
                <SocialMediaIcon socialMediaType="facebook" userSocialMediaURL={
                    props.contacts.facebook} />
                <SocialMediaIcon socialMediaType="vk" userSocialMediaURL={
                    props.contacts.vk} />
                <SocialMediaIcon socialMediaType="x" userSocialMediaURL={
                    props.contacts.twitter} />
                <SocialMediaIcon socialMediaType="telegram" userSocialMediaURL={
                    props.contacts.telegram} />
                <SocialMediaIcon socialMediaType="youtube" userSocialMediaURL={
                    props.contacts.youtube} />
                <SocialMediaIcon socialMediaType="github" userSocialMediaURL={
                    props.contacts.github} />
            </div>
        </div>
    )
}
