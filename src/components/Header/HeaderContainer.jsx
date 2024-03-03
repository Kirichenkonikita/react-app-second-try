import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import {
    logoutCurrentAuthorisedUser,
    setInStoreAuthorisedUserObjs,
} from "../../redux/reducers/otherComponents/AuthReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setInStoreAuthorisedUserObjs();
    }
    render() {
        return <Header {...this.props} />
    }
}

function mapDispatchToProps(state) {
    const authState = state.Auth;
    return {
        ...authState,
    }
}

const mapACtoProps = {
    logoutCurrentAuthorisedUser,
    setInStoreAuthorisedUserObjs,
}

export default connect(mapDispatchToProps, mapACtoProps)(HeaderContainer);