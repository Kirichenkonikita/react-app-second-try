import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import {
    setCurrentAuthorisedUserObj,
    setCurrentAuthorisedUserProfileObj,
    logoutCurrentAuthorisedUser,
} from "../../redux/reducers/otherComponents/AuthReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
            .then(result => {
                this.props.setCurrentAuthorisedUserObj(result.data.data);
                return result.data.data.id;
            })
            .then(userId => {
                let url = `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
                axios.get(url).then((result) => this.props.setCurrentAuthorisedUserProfileObj(result.data))
            });

    }
    render() {
        return <Header {...this.props}/>
    }
}

function mapDispatchToProps(state) {
    const authState = state.Auth;
    return {
        ...authState,
    }
}

const mapACtoProps = {
    setCurrentAuthorisedUserObj,
    setCurrentAuthorisedUserProfileObj,
    logoutCurrentAuthorisedUser,
}

export default connect(mapDispatchToProps, mapACtoProps)(HeaderContainer);