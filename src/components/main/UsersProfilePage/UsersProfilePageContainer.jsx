import { connect } from "react-redux";
import { setUsersPage, toggleUserProfileIsLoaded, UserProfilePageThunks } from "./../../../redux/reducers/UsersPofilePage/UsersProfilePageReducer";
import { withRouter } from "../../..";
import React from "react";
import { togglePreloader } from "../../../redux/reducers/otherComponents/PreloaderReducer";
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
// проблема в том, что профиль ещё не загрузился, а начинается отрисовка - надо остановить отрисовку до тех пор, пока не загрузится

function mapStateToProps(state) {
    return {
        ...state.UsersProfilePage.userObj,
        userProfileIsLoaded: state.UsersProfilePage.userProfileIsLoaded,
    }
}
const dispatchToPropsObj = {
    setUsersPage,
    toggleUserProfileIsLoaded,
    togglePreloader,
    ...UserProfilePageThunks,
}

export default compose(
    connect(mapStateToProps, dispatchToPropsObj),
    withRouter,
    withAuthRedirect,
)(UsersProfilePageContainer)