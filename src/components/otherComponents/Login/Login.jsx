import { Field, reduxForm } from "redux-form"
import classNameObj from "./Login.module.css"
import { connect } from "react-redux"
import { authoriseUserByFormObj } from "../../../redux/reducers/otherComponents/AuthReducer"
import IsAuthorised from "../Auth/IsAuthorised/IsAuthorised"

function Login(props) {
    return (
        <form className={classNameObj.LoginContainer} onSubmit={props.handleSubmit}>
            <Field name="email" component="input" placeholder="Login" />
            <Field name="password" component="input" placeholder="Password" />
            <Field className={classNameObj.rememberMeCheckbox} name="rememberMe" component="input" type="checkbox" />
            <label for="rememberMe">Запомнить меня</label>
            <button type="submit">Отправить форму</button>
        </form>
    )
}

const LoginWithReduxForm = reduxForm({ form: "LoginForm" })(Login)

function LoginWRxForm(props) {
    function onSubmit(formData) {
        props.authoriseUserByFormObj(formData)
    }

    if (props.isAuthorised) {
        return <IsAuthorised />
    } else if (!props.isAuthorised) {
        return (
            <div>
                <h1>Форма авторизации</h1>
                <LoginWithReduxForm onSubmit={onSubmit} />
            </div>
        )
    }
}

export default connect(
    state => ({ isAuthorised: state.Auth.isAuthorised }),
    { authoriseUserByFormObj }
)
    (LoginWRxForm)