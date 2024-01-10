import classNameObj from "./UserInfo.module.css";

function UserInfo(props) {
    return (
        <div className={classNameObj.userInfoContainer}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" alt="Avatar"></img>
            <h4>Имя пользователя</h4>
            <div className={classNameObj.userTextInfo}>
                <ul>
                    <li>Имя</li>
                    <li>Место рождения</li>
                    <li>Дата рождения</li>
                    <li>Место учёбы</li>
                    <li>Город проживания</li>
                    <li>О себе</li>
                </ul>
            </div>
        </div>
    )
}

export default UserInfo;