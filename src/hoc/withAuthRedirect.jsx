import { connect } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";

// тут логика такова. Возвращаем базовый компонент, который ничего дополнительно не получает, он отрисовывается ТОЛЬКО если выполнена авторизация. Как следствие, он должен получать в качестве параметров авторизационные данные. Вызовы коннекта возвращают компоненту? Да.

export default function withAuthRedirect(Component) {
    function mapStateToProps(state) {
        return {
            ...state.Auth
        }
    }

    return connect(mapStateToProps)(function (props) {
        if (props.isAuthorised) {
            return <Component {...props} />
        } else {
            return <Navigate to={"/login"} />
        }
    })
}


// что делает withRouter? Получает данные из адресной строки и передаёт их в качестве пропсов принимаемой компоненте. Не совсем. Функция принимает компоненту, и возвращает компоненту, но уже имеющую доступ к необходимым данным. Имеет место замыкание? 