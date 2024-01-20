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
                            classNameObj.unActivePage}>
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
    getUsers(usersAmountDisplayed, currentActivePage, term) {
        let url = "https://social-network.samuraijs.com/api/1.0/users"

        if (usersAmountDisplayed) {
            url = url + "?" + usersAmountDisplayed;
        }
        if (currentActivePage) {
            url = url + "&" + currentActivePage;
        }
        if (term) {
            url = url + "&" + term;
        }

        axios.get(url)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }
    render() {

        return (
            <div className={classNameObj.UsersContainer}>
                <div className={classNameObj.pageSwitchersContainer}>
                    {this.createPagesArr()}
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