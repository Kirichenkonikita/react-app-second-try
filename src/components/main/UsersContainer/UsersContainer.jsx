import { connect } from "react-redux";
import Users from "./Users/Users";
import { follow, UsersThunks, setCurrentActivePage, setIsLoading, setTotalUsersAmount, setUsers, setUsersAmountDisplayed, unFollow, toggleFollowingInProcess } from "../../../redux/reducers/Users/UsersReducer";
import { UsersProfilePageActionCreatorsObj } from "../../../redux/reducers/UsersPofilePage/UsersProfilePageReducer";

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
        possibleAmountUsersDisplayedArr: UsersState.possibleAmountUsersDisplayedArr,
        initialisationFinished: UsersState.initialisationFinished,
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
    setUsersPage: UsersProfilePageActionCreatorsObj.setUsersPage,
    toggleFollowingInProcess,
    ...UsersThunks,
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;


