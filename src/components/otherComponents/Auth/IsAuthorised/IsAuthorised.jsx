import { connect } from "react-redux";
import classNameObj from "./IsAuthorised.module.css";
import { dismountCurrentAuthorisedUser } from "../../../../redux/reducers/otherComponents/AuthReducer";

function IsAuthorised(props) {
    const currentAuthorisedUserObj = props.currentAuthorisedUserObj;
    const onLogoutClick = props.dismountCurrentAuthorisedUser;
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


export default connect(state => ({...state.Auth}), {dismountCurrentAuthorisedUser})(IsAuthorised);