import { connect } from "react-redux";
import Users from "./Users";
import { followAC, setUsersAC, unFollowAC } from "../../../redux/reducers/Users/UsersReducer";

function mapStateToProps(state) {
    return {usersArr: state.Users.usersArr};
}

function mapDispatchToProps(dispatch) {
    return {
        follow: (id) => dispatch(followAC(id)),
        unFollow: (id) => dispatch(unFollowAC(id)),
        setUsers: (usersArr) => dispatch(setUsersAC(usersArr))
    };
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;