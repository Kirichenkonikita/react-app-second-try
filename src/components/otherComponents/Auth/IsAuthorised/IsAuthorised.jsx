import classNameObj from "./IsAuthorised.module.css";

export default function IsAuthorised(props) {
    const currentAuthorisedUserObj = props.currentAuthorisedUserObj;
    const onLogoutClick = props.logoutCurrentAuthorisedUser;
    return (
        <div className={classNameObj.IsAuthorisedContainer}>
            <img src="" alt=""></img>
                <div>
                    <h1>{currentAuthorisedUserObj.login}</h1>
                    <p>{currentAuthorisedUserObj.email}</p>
                    <button onClick={onLogoutClick}>Разлогиниться</button>
                </div>
        </div>
    )
}