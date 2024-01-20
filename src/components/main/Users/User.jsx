import React from "react";
import userImage from "./230263-200.png";
import classNameObj from "./User.module.css";

class User extends React.Component {
    onClick = (event) => {
        this.props.followed ?
            this.props.unFollow(this.props.id) :
            this.props.follow(this.props.id)
    }
    render() {
        return (
            <div className={classNameObj.UserContainer}>
                <div className={classNameObj.UserLeftContainer}>
                    <img src={
                        this.props.photos.small ?
                            this.props.photos.small :
                            userImage
                    }
                        alt="Аватарка пользователя"
                    />
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

