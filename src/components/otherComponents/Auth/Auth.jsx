import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { setCurrentAuthorisedUserObj, setCurrentAuthorisedUserProfileObj } from "../../../redux/reducers/otherComponents/AuthReducer";}

class Auth extends React.Component {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", { withCredentials: true })
            .then(response => {
                this.props.setCurrentAuthorisedUserObj(response.data)
                return response.data.id;
            })
            .then(userId => {
                let url = `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
                axios.get(url).then((result) => this.props.setCurrentAuthorisedUserProfileObj(result.data))
            })
    }

    render() {
        return {}
    }
}

function mapStateToProps(state) {
    return {
        ...state.Auth,
    }
}

const reducerACObj = {
    setCurrentAuthorisedUserObj,
    setCurrentAuthorisedUserProfileObj,
}

export default connect(mapStateToProps, reducerACObj)(Auth);