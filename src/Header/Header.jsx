import React from "react";
import classesObj from "./Header.module.css";

function Header(props) {
    return (
        <div className={classesObj.headerContainer}>
            <img src="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d0a4481f-e801-4cb7-9daa-17cdae32cc89/icon-design-21-opt.png" alt="" className={classesObj.headerLogoIcon}/>
            <div>
                <h1>Заголовок</h1>
            </div>
        </div>
    );
}

export default Header;