import { connect } from "react-redux";
import { setUsersPage } from "./../../../redux/reducers/UsersPofilePage/UsersProfilePageReducer";
import UsersProfilePage from "./UsersProfilePage";
import { withRouter } from "../../..";
import React from "react";
import Preloader from "../../otherComponents/Preloader/Preloader";
import axios from "axios";

class UsersProfilePageContainer extends React.Component {
    getUser(userId) {
        if (this.props.userObjIsLoaded && this.props.userId == userId) {
            return
        }

        let url = `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
        axios.get(url).then((result) => this.props.setUsersPage(result.data))
    }
    componentDidMount() {
        const currentUserId = this.props.router.params.userId;
        if (!currentUserId) {
            return
        }
        this.getUser(currentUserId)
    }

    render() {
        if (!this.props.userObjIsLoaded) {
            return <Preloader />;
        }

       return <UsersProfilePage {...this.props} />
    }
}


function mapStateToProps(state) {
    let UsersProfilePage = state.UsersProfilePage;
    let userObjIsLoaded = false;
    
    if (UsersProfilePage.userObj) {
        userObjIsLoaded = true;
    }

    return {
       ...UsersProfilePage.userObj,
       userObjIsLoaded,
    }
}

const dispatchToPropsObj = {
    setUsersPage,
}

const UsersProfilePageWithRouter = withRouter(UsersProfilePageContainer);

export default connect(mapStateToProps, dispatchToPropsObj)(UsersProfilePageWithRouter);