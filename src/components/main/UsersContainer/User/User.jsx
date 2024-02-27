import React from "react";
import userImage from "./../../../../assets/230263-200.png";
import classNameObj from "./User.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

class User extends React.Component {
    onClick = () => {
        let url = `https://social-network.samuraijs.com/api/1.0/follow/${this.props.id}`

        const optionsObj = {
            withCredentials: true,
            headers: {
                "API-KEY": "dc906419-adef-444f-90e0-c043119c8e82",
            }
        }

        if (!this.props.followed) {
            axios.post(url, null, optionsObj)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        alert("Подписался на" + this.props.name);
                    } else if (response.data.resultCode === 1) {
                        alert("Уже подписан на пользователя" + this.props.name);
                    }
                })
                .then(() => this.props.follow(this.props.id));
        } else if (this.props.followed) {
            axios.delete(url, optionsObj)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        alert("Отписался от" + this.props.name)
                    } else if (response.data.resultCode === 1) {
                        alert("Не подписан на пользователя" + this.props.name);
                    }
                })
            .then(() => this.props.unFollow(this.props.id));
        }
    }
    getUser(userId) {
        let url = `https://social-network.samuraijs.com/api/1.0/profile/${userId}`

        axios.get(url)
            .then((result) => this.props.setUsersPage(result.data))
    }
    render() {
        return (
            <div className={classNameObj.UserContainer}>

                <div className={classNameObj.UserLeftContainer}>
                    <NavLink to={"/profile/" + this.props.id}>
                        <img src={
                            this.props.photos.small ?
                                this.props.photos.small :
                                userImage
                        }
                            alt="Аватарка пользователя"
                        />
                    </NavLink>
                    <button onClick={this.onClick}>
                        {this.props.followed ? "Отписаться" : "Подписаться"}
                    </button>
                </div>

                <div>
                    <h3>
                        {
                            this.props.name ?
                                this.props.name :
                                "Имя пользователя"
                        }
                    </h3>
                    <p>
                        {
                            this.props.status ?
                                this.props.status :
                                "Статус пользователя отсутствует"
                        }
                    </p>
                </div>
            </div>
        )
    }
}

export default User;

