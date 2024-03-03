import axios from "axios";
import User from "../User/User";
import React from "react";
import classNameObj from "./Users.module.css"
import Preloader from "../../../otherComponents/Preloader/Preloader"


class Users extends React.Component {
    createPagesArr() {
        let pagesArr = [];

        for (let i = 1; i <= this.props.pagesToDisplay; i++) {
            pagesArr.push(i);
        }

        pagesArr = pagesArr.map(item => {
            return (
                <div
                    className={classNameObj.pageSwitcher}
                    key={"pagesSwitcher" + item}>
                    <p className={
                        item === this.props.currentActivePage ?
                            classNameObj.activePage :
                            classNameObj.unActivePage}
                        onClick={this.pageSwitcherCC(item)}>
                        {item}
                    </p>
                </div>
            )
        })

        return pagesArr;
    }
    createUsersArr() {
        const usersArr = this.props.usersArr;

        const UsersArr = usersArr.map(userObj => {
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
        })

        return UsersArr;
    }
    createUsersAmountSwitchersArr(arr) {
        const UsersAmountSwitcherButton = (props) => {
            let className;
            this.props.usersAmountDisplayed === props.usersAmountDisplayed ?
                className = classNameObj.activeAmountSwitcherButton :
                className = classNameObj.unActiveAmountSwitcherButton;

            return (
                <div onClick={this.userAmountSwitcherCC(props.usersAmountDisplayed)}
                    className={className}>
                    {props.usersAmountDisplayed}
                </div>
            )
        }

        return arr.map(usersAmountDisplayed => {
            return <UsersAmountSwitcherButton usersAmountDisplayed={usersAmountDisplayed} />
        })
    }
    getUsers() {
        this.props.setIsLoading(true);
        let url = "https://social-network.samuraijs.com/api/1.0/users"

        url = url + "?count=" + this.props.usersAmountDisplayed + "&page=" + this.props.currentActivePage;

        if (this.term) {
            url = url + "&term=" + this.term;
        }

        const optionsObj = {
            withCredentials: true,
            headers: {
                "API-KEY": "dc906419-adef-444f-90e0-c043119c8e82",
            }
        }
        axios.get(url, optionsObj)
            .then(response => {
                this.props.setTotalUsersAmount(response.data.totalCount);
                this.props.setUsers(response.data.items)
            })
            .then(() => this.props.setIsLoading(false));
    }
    userAmountSwitcherCC(usersAmountDisplayed) {
        return () => {
            new Promise((resolve) => {
                this.props.setUsersAmountDisplayed(usersAmountDisplayed);
                resolve();
            }).then(() => this.getUsers())
        }
    }
    pageSwitcherCC(pageNumber) {
        return () => {
            new Promise((resolve) => {
                this.props.setCurrentActivePage(pageNumber);
                resolve();
            }).then(() => this.getUsers())
        }
    }
    render() {
        return (
            <div className={classNameObj.UsersContainer}>

                {this.props.isLoading
                    ? <Preloader />
                    : false}

                <div>
                    <p>Выводить пользователей на страницу</p>
                    <div className={classNameObj.usersAmountDisplayedSwitcherContainer}>
                        {this.createUsersAmountSwitchersArr([5, 10, 20, 100])}
                    </div>
                </div>

                <div className={classNameObj.pageSwitchersContainer}>
                    {this.createPagesArr()}
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

                {this.createUsersArr()}

            </div>
        );
    }
    componentDidMount() {
        this.getUsers();
    }
}


export default Users;