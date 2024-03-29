import { connect } from "react-redux";
import classNameObj from "./IsAuthorised.module.css";
import { dismountCurrentAuthorisedUser, logOutCurrentAuthorisedUser } from "../../../../redux/reducers/otherComponents/AuthReducer";

function IsAuthorised(props: any) {
    const currentAuthorisedUserObj = props.currentAuthorisedUserObj;
    return (
        <div className={classNameObj.IsAuthorisedContainer}>
            <img src="" alt=""></img>
                <div>
                    <h1>{currentAuthorisedUserObj.login}</h1>
                    <p>{currentAuthorisedUserObj.email}</p>
                    <button onClick={props.logOutCurrentAuthorisedUser}>Разлогиниться</button>
                </div>
        </div>
    )
}


export default connect((state: any) => ({...state.Auth}), {dismountCurrentAuthorisedUser, logOutCurrentAuthorisedUser})(IsAuthorised);