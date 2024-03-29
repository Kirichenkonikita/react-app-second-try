import { connect } from "react-redux";
import { UsersProfilePageActionCreatorsObj, UserProfilePageThunksObj } from "./../../../redux/reducers/UsersPofilePage/UsersProfilePageReducer";
import { withRouter } from "../../..";
import React from "react";
import { PreloaderActionCreators } from "../../../redux/reducers/otherComponents/PreloaderReducer";
import withAuthRedirect from "../../../hoc/withAuthRedirect"
import { compose } from "redux";
import UsersProfilePage from "./UsersProfilePage";
import Preloader from "../../otherComponents/Preloader/Preloader";

class UsersProfilePageContainer extends React.Component {
    componentDidMount() {
        this.props.setUserProfileObjInState(this.props.router.params.userId)
    }

    render() {
        if (this.props.preloaderIsToggledOn) {
            return <Preloader /> 
        }
        return <UsersProfilePage {...this.props} />
    }
}

function mapStateToProps(state) {
    return {
        ...state.UsersProfilePage.userObj,
        userProfileIsLoaded: state.UsersProfilePage.userProfileIsLoaded,
    }
}
const dispatchToPropsObj = {
    ...UsersProfilePageActionCreatorsObj,
    ...PreloaderActionCreators,
    ...UserProfilePageThunksObj,
}

export default compose(
    connect(mapStateToProps, dispatchToPropsObj),
    withRouter,
    withAuthRedirect,
)(UsersProfilePageContainer)