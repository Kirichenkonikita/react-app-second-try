import { connect } from "react-redux";
import Users from "./Users/Users";
import { follow, setCurrentActivePage, setIsLoading, setTotalUsersAmount, setUsers, setUsersAmountDisplayed, unFollow } from "../../../redux/reducers/Users/UsersReducer";

function mapStateToProps(state) {
    const UsersState = state.Users;

    return {
        usersArr: UsersState.usersArr,
        totalUsersCount: UsersState.totalUsersCount,
        usersAmountDisplayed: UsersState.usersAmountDisplayed,
        pagesRequiredToDisplay: UsersState.pagesRequiredToDisplay,
        pagesToDisplay: UsersState.pagesToDisplay,
        currentActivePage: UsersState.currentActivePage,
        isLoading: UsersState.isLoading,
    };
}

/* function mapDispatchToProps(dispatch) {
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

        setIsLoading: (boolean) => dispatch(
            setIsLoadingAC(boolean)),
    };
}
 */

const mapDispatchToProps = {
    follow,
    unFollow,
    setUsers,
    setTotalUsersAmount,
    setUsersAmountDisplayed,
    setCurrentActivePage,
    setIsLoading,
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;


