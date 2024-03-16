import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { setInStoreAuthorisedUserObjs } from "../../redux/reducers/otherComponents/AuthReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setInStoreAuthorisedUserObjs()
    }
    render() {
        return <Header {...this.props} />
    }
}

export default connect(
    state => ({ isAuthorised: state.Auth.isAuthorised }),
    { setInStoreAuthorisedUserObjs }
)
    (HeaderContainer);