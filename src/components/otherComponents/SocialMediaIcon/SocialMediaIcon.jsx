import facebookIcon from "./../../../assets/otherComponents/SocialMediaIcon/facebook.png";
import xIcon from "./../../../assets/otherComponents/SocialMediaIcon/x.png";
import githubIcon from "./../../../assets/otherComponents/SocialMediaIcon/github.png";
import telegramIcon from "./../../../assets/otherComponents/SocialMediaIcon/telegram.png";
import youtubeIcon from "./../../../assets/otherComponents/SocialMediaIcon/youtube.png";
import vkIcon from "./../../../assets/otherComponents/SocialMediaIcon/vk.png";
import defaultIcon from "./../../../assets/otherComponents/SocialMediaIcon/default.png";
import classNameObj from "./SocialMediaIcon.module.css";
import React from "react";

export default function SocialNetworkIcon(props) {
    let icon;

    switch (props.socialMediaType) {
        case "facebook":
            icon = facebookIcon;
            break;
        case "x":
            icon = xIcon;
            break;
        case "github":
            icon = githubIcon;
            break;
        case "telegram":
            icon = telegramIcon;
            break;
        case "youtube":
            icon = youtubeIcon;
            break;
        case "vk":
            icon = vkIcon;
            break;
        default:
            icon = defaultIcon;
            break;
    }
    
    debugger;

    return (
        <div className={classNameObj.SocialMediaIconContainer}>
            <a href={props.userSocialMediaURL}>
                <img src={icon} alt={props.socialMediaType} />
            </a>
        </div>
    )
}