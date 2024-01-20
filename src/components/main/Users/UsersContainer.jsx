import { connect } from "react-redux";
import Users from "./Users";
import { followAC, setCurrentActivePageAC, setTotalUsersAmountAC, setUsersAC, setUsersAmountDisplayedAC, unFollowAC } from "../../../redux/reducers/Users/UsersReducer";

function mapStateToProps(state) {
    const UsersState = state.Users;

    return {
        usersArr: UsersState.usersArr,
        totalUsersCount: UsersState.totalUsersCount,
        usersAmountDisplayed: UsersState.usersAmountDisplayed,
        pagesRequiredToDisplay: UsersState.pagesRequiredToDisplay,
        pagesToDisplay: UsersState.pagesToDisplay,
        currentActivePage: UsersState.currentActivePage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        follow: (id) => dispatch(followAC(id)),

        unFollow: (id) => dispatch(unFollowAC(id)),

        setUsers: (usersArr) => dispatch(setUsersAC(usersArr)),

        setTotalUsersAmount: (totalUsersCount) => dispatch(
            (setTotalUsersAmountAC(totalUsersCount))),

        setUsersAmountDisplayed: (usersAmountDisplayed) => dispatch(
            setUsersAmountDisplayedAC(usersAmountDisplayed)),

        setCurrentActivePage: (currentActivePage) => dispatch(
            setCurrentActivePageAC(currentActivePage)),
    };
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;