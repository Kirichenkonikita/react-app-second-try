import axios from "axios";
import User from "./User";
import React from "react";
import classNameObj from "./Users.module.css"


class Users extends React.Component {
    createPagesArr() {
        let pagesArr = [];

        for (let i = 1; i <= this.props.pagesToDisplay; i++) {
            pagesArr.push(i);
        }

        pagesArr = pagesArr.map(item => {
            return (
                <div className={classNameObj.pageSwitcher}>
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
            return <
                User name={userObj.name}
                id={userObj.id}
                uniqueUrlName={userObj.uniqueUrlName}
                photos={userObj.photos}
                status={userObj.status}
                followed={userObj.followed}
                key={userObj.id}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
            />
        })

        return UsersArr;
    }
    getUsers() {
        let url = "https://social-network.samuraijs.com/api/1.0/users"

        url = url + "?count=" + this.props.usersAmountDisplayed + "&page=" + this.props.currentActivePage;

        if (this.term) {
            url = url + "&term=" + this.term;
        }
        axios.get(url)
            .then(response => {
                this.props.setTotalUsersAmount(response.data.totalCount);
                this.props.setUsers(response.data.items)                             
            });
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
                <div>
                    <p>Выводить пользователей на страницу</p>
                    <div className={classNameObj.usersAmountDisplayedSwitcherContainer}>
                        <div onClick={this.userAmountSwitcherCC(5)}>
                            5
                        </div>
                        <div onClick={this.userAmountSwitcherCC(10)}>
                            10
                        </div>
                        <div onClick={this.userAmountSwitcherCC(20)}>
                            20
                        </div>
                        <div onClick={this.userAmountSwitcherCC(100)}>
                            100
                        </div>
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
                <h3>Пользователь</h3>
                <div></div>
                {this.createUsersArr()}
                <button>Добавить ищщо ползьзователей</button>
            </div>
        );
    }
    componentDidMount() {
        this.getUsers();
    }
}


export default Users;