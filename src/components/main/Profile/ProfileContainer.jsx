import { connect } from "react-redux";
import Profile from "./Profile";

function mapStateToProps(state) {
    let UsersProfilePage = state.Auth.currentAuthorisedUserProfileObj;


    return {
       ...UsersProfilePage,
       userObjIsLoaded: state.Auth.profileIsLoaded,
       isAuthorised: state.Auth.isAuthorised,
    }
}

export default connect(mapStateToProps)(Profile);