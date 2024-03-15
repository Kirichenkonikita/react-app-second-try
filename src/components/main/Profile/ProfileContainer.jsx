import { connect } from "react-redux";
import Profile from "./Profile";
import React from "react";
import { setAuthorisedUserStatusByStr } from "../../../redux/reducers/otherComponents/AuthReducer";

class ProfileContainer extends React.Component {
    render() { 
        return <Profile {...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        ...state.Auth,
        userProfileIsLoaded: state.Auth.profileIsLoaded,
        ...state.Auth.currentAuthorisedUserProfileObj,
    }
}

export default connect(mapStateToProps, { setAuthorisedUserStatusByStr })(ProfileContainer);