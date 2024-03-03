import { connect } from "react-redux";
import Users from "./Users/Users";
import { follow, followUserById, unFollowUserById, setCurrentActivePage, setIsLoading, setTotalUsersAmount, setUsers, setUsersAmountDisplayed, unFollow, toggleFollowingInProcess } from "../../../redux/reducers/Users/UsersReducer";
import { setUsersPage } from "../../../redux/reducers/UsersPofilePage/UsersProfilePageReducer";

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
        usersIdsFollowingInProcessArr: UsersState.usersIdsFollowingInProcessArr,
    };
}

const mapDispatchToProps = {
    follow,
    unFollow,
    setUsers,
    setTotalUsersAmount,
    setUsersAmountDisplayed,
    setCurrentActivePage,
    setIsLoading,
    setUsersPage,
    toggleFollowingInProcess,
    followUserById,
    unFollowUserById,    
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;


