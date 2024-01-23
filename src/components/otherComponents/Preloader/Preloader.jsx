import React from "react";
import preloaderImage from "./../../../assets/1485.gif";
import classNameObj from "./Preloader.module.css";

export default function Preloader(props) {
    return (
            <div className={classNameObj.preloaderContainer}>
                <img src={preloaderImage} alt="Идёт загрузка" />
            </div>

    )
}