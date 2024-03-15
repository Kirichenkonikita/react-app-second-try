import User from "../User/User";
import React from "react";
import classNameObj from "./Users.module.css"
import Preloader from "../../../otherComponents/Preloader/Preloader"


class Users extends React.Component {
    componentDidMount() {
        if (this.props.initialisationFinished) return
        this.props.reloadUsersArrayByCountPageTerm(
            this.props.usersAmountDisplayed,
            this.props.currentActivePage
        );
    }
    render() {
        return (
            <div className={classNameObj.UsersContainer}>
                {
                    this.props.isLoading
                        ? <Preloader />
                        : false
                }

                <div>
                    <p>Выводить пользователей на страницу</p>

                    <div className={classNameObj.usersAmountDisplayedSwitcherContainer}>
                        {this.props.mapArrToUsersPerPageButtonsArr(
                            this.props.possibleAmountUsersDisplayedArr,
                            classNameObj,
                            this.props.usersAmountDisplayed,
                            this.props.currentActivePage
                        )}
                    </div>
                </div>

                <div className={classNameObj.pageSwitchersContainer}>
                    {this.props.createPageButtonsArrByPagesToDisplay(
                        this.props.pagesToDisplay,
                        this.props.currentActivePage,
                        classNameObj,
                        this.props.usersAmountDisplayed
                    )}

                    <div>
                        <p>
                            Всего страниц {this.props.pagesRequiredToDisplay}
                        </p>
                    </div>

                    <div>
                        <p>
                            Пользователей в сети {this.props.totalUsersCount}
                        </p>
                    </div>
                </div>

                {this.props.usersArr.map(userObj => {
                    return <User
                        {...userObj}
                        key={"usersArrKey" + userObj.id}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
                        setUsersPage={this.props.setUsersPage}
                        toggleFollowingInProcess={this.props.toggleFollowingInProcess}
                        usersIdsFollowingInProcessArr={this.props.usersIdsFollowingInProcessArr}
                        followUserById={this.props.followUserById}
                        unFollowUserById={this.props.unFollowUserById}
                    />
                })}
            </div>
        );
    }
}


export default Users;