import { connect } from "react-redux";
import { setUsersPage, toggleUserProfileIsLoaded } from "./../../../redux/reducers/UsersPofilePage/UsersProfilePageReducer";
import UsersProfilePage from "./UsersProfilePage";
import { withRouter } from "../../..";
import React from "react";
import Preloader from "../../otherComponents/Preloader/Preloader";
import { ProfileAxiosRequestObj } from "../../../api/axiosRequests";
import axios from "axios";

class UsersProfilePageContainer extends React.Component {
    componentDidMount() {
        const currentUserId = this.props.router.params.userId;
        if (!currentUserId) {
            return
        }
        this.props.toggleUserProfileIsLoaded(false);

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${currentUserId}`)
        .then(response => {
            this.props.setUsersPage(response.data);
            console.log(response)
            return response.data;
        })
        .then((response) => {
            if (!response) return
            this.props.toggleUserProfileIsLoaded(true)
        })
    }

    render() {
        if (!this.props.userProfileIsLoaded) {
            return <Preloader />;
        }

       return <UsersProfilePage {...this.props} />
    }
}


function mapStateToProps(state) {
    let UsersProfilePageState = state.UsersProfilePage;
    return {
       ...UsersProfilePageState.userObj,
       userProfileIsLoaded: UsersProfilePageState.userProfileIsLoaded,
    }
}

const dispatchToPropsObj = {
    setUsersPage,
    toggleUserProfileIsLoaded
}

const UsersProfilePageWithRouter = withRouter(UsersProfilePageContainer);

export default connect(mapStateToProps, dispatchToPropsObj)(UsersProfilePageWithRouter);