import React from "react";
import classNameObj from "./UsersProfilePage.module.css";
import SocialMediaIcon from "./../../otherComponents/SocialMediaIcon/SocialMediaIcon";

export default class UsersProfilePage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <img src={this.props.photos.large} alt="Аватарка пользователя" />
                    <div>
                        <p>{this.props.aboutMe}</p>
                        <p>{this.props.lookingForAJob
                            ? "В поисках работы"
                            : "Работу не ищу, и не собираюсь"}</p>
                        <p>{this.props.lookingForAJob
                            ? false
                            : this.props.lookingForAJobDescription}</p>
                        <p>Мой вебсайт: {this.props.website}</p>
                    </div>
                    <div className={classNameObj.SocialMediaIconContainer}>
                            <SocialMediaIcon socialMediaType="facebook" userSocialMediaURL={
                                this.props.contacts.facebook}/>
                            <SocialMediaIcon socialMediaType="vk" userSocialMediaURL={
                                this.props.contacts.vk}/>
                            <SocialMediaIcon socialMediaType="x" userSocialMediaURL={
                                this.props.contacts.twitter}/>
                            <SocialMediaIcon socialMediaType="telegram" userSocialMediaURL={
                                this.props.contacts.telegram}/>
                            <SocialMediaIcon socialMediaType="youtube" userSocialMediaURL={
                                this.props.contacts.youtube}/>
                            <SocialMediaIcon socialMediaType="github" userSocialMediaURL={
                                this.props.contacts.github}/>
                    </div>
                </div>
            </div>
        )
    }
}