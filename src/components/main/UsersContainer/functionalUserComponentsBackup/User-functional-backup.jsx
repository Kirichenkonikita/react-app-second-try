import userImage from "./230263-200.png";
import classNameObj from "./User.module.css";

function User(props) {
    console.log("в User приходит", props)

    function onClick(event) {
        props.followed ?
            props.unFollow(props.id) :
            props.follow(props.id)
    }

    return (
        <div className={classNameObj.UserContainer}>
            <div className={classNameObj.UserLeftContainer}>
                <img src={
                    props.photos.small ?
                        props.photos.small :
                        userImage
                }
                    alt="Аватарка пользователя"
                />
            <button onClick={onClick}>
                {props.followed ? "Отписаться" : "Подписаться"}
            </button>
            </div>

            <div>
                <h3>
                    {
                    props.name? 
                    props.name :
                    "Имя пользователя"
                    }
                    </h3>
                <p>
                    {
                    props.status ?
                    props.status :
                    "Статус пользователя отсутствует"
                    }
                    </p>
            </div>
        </div>
    )
}

export default User;

