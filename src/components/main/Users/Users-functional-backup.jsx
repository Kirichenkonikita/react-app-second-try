import axios from "axios";
import User from "./User";


function Users(props) {
    
    const usersArr = props.usersArr;
    
    const UsersArr = usersArr.map(userObj => {
        console.log("в Users приходит", typeof(props.follow))
        return <
            User name={userObj.name}
            id={userObj.id} 
            uniqueUrlName={userObj.uniqueUrlName} 
            photos={userObj.photos} 
            status={userObj.status} 
            followed={userObj.followed}
            key={userObj.id}
            follow={props.follow} 
            unFollow={props.unFollow}
        />
    })

    function loadUsers() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
                    .then(response => {
                        props.setUsers(response.data.items)}
                        );
    }

    return (

        <div>
            <h3>Пользователь</h3>
            <button onClick={loadUsers}>Подгрузить пачку пользователей</button>
            {UsersArr}
            <button>Добавить ищщо ползьзователей</button>
        </div>
    );
}

export default Users;