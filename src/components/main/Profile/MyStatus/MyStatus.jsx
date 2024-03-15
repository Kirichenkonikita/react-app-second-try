import React from "react";
import classNameObj from "./MyStatus.module.css";

export default class MyStatus extends React.Component {
    state = {
        inEditMode: false,
        statusStr: this.props.currentAuthorisedUserStatus,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentAuthorisedUserStatus !== this.state.statusStr) {
            this.setState({
                statusStr: this.state.statusStr
            })
        }
    }

    toggleEditMode = (boolean) => {
        this.setState({
            inEditMode: boolean
        })
    }

    changeValue = (event) => {
        this.setState({
            statusStr: event.currentTarget.value,
        })
    }

    render() {
        return (
            <div className={classNameObj.MyStatusContainer}>

                {
                    this.state.inEditMode
                        ? (<div>
                            <input
                                autoFocus
                                onBlur={() => {
                                    this.toggleEditMode(false)
                                    this.props.setAuthorisedUserStatusByStr(this.state.statusStr)
                                }}
                                onChange={this.changeValue}
                                type="text"
                                value={this.state.statusStr}
                            />
                        </div>)
                        : <p onClick={() => this.toggleEditMode(true)}>
                            {this.props.currentAuthorisedUserStatus || "Статус не установлен (глобальный стейт пустой)"}
                            </p>
                }
            </div>
        )
    }
}