import React from "react";
import userImage from "./../../../../assets/230263-200.png";
import classNameObj from "./User.module.css";
import { NavLink } from "react-router-dom";

export default function User(props) {
// По состоянию props.followed формируется либо кнопка подписки с соответствующим текстом и коллбэком, либо кнопка отписки.
    let followButton;

    if (props.followed) {
        followButton = <button
            onClick={() => props.unFollowUserById(props.id)}
            disabled={props.usersIdsFollowingInProcessArr
                .some(userId => userId === props.id)}>Отписаться</button>
    } else if (!props.followed) {
        followButton = <button
            onClick={() => props.followUserById(props.id)}
            disabled={props.usersIdsFollowingInProcessArr
                .some(userId => userId === props.id)}>Подписаться</button>
    }

    return (
        <div className={classNameObj.UserContainer}>
            <div className={classNameObj.UserLeftContainer}>
                <NavLink to={"/profile/" + props.id}>
                    <img src={
                        props.photos.small
                            ? props.photos.small
                            : userImage
                    }
                        alt="Аватарка пользователя"
                    />
                </NavLink>

                {followButton}
            </div>

            <div>
                <h3>
                    {
                        props.name
                            ? props.name
                            : "Имя пользователя"
                    }
                </h3>

                <p>
                    {
                        props.status
                            ? props.status
                            : "Статус пользователя отсутствует"
                    }
                </p>
            </div>
        </div>
    )
}
