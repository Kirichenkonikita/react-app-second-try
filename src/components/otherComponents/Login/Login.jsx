import classNameObj from "./Login.module.css"

export default function Login(props) {
    return (
        <div className={classNameObj.LoginContainer}>
            <h1>Форма авторизации</h1>
            <div>
                <input type="text" placeholder="Имя пользователя" />
                <input type="text" placeholder="Пароль" />
                <button>Авторизироваться!</button>
            </div>
        </div>
    )
}