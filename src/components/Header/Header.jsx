import React from "react";
import classNameObj from "./Header.module.css";
import IsAuthorised from "../otherComponents/Auth/IsAuthorised/IsAuthorised";
import IsNotAuthorised from "../otherComponents/Auth/IsNotAuthorised/IsNotAuthorised";

function Header(props) {
    return (
        <div className={classNameObj.headerContainer}>
            <img src="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d0a4481f-e801-4cb7-9daa-17cdae32cc89/icon-design-21-opt.png" alt="" className={classNameObj.headerLogoIcon} />
            <div>
                <h1>Заголовок</h1>
            </div>
            <div>
            {
                props.isAuthorised
                    ? <IsAuthorised {...props} />
                    : <IsNotAuthorised {...props} />
            }
            </div>
        </div>
    );
}

export default Header;