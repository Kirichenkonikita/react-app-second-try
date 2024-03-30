import classNameObj from "./Preloader.module.css";
import preloaderImage from "../../../assets/1485.gif"

export default function Preloader() {
    return (
            <div className={classNameObj.preloaderContainer}>
                <img src={preloaderImage} alt="Идёт загрузка" />
            </div>

    )
}