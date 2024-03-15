import { connect } from "react-redux";
import Preloader from "../components/otherComponents/Preloader/Preloader";

/* 
Причины:
1) componentDidMount выполняется ПОСЛЕ того, как успешно выполнится рендер
2) При добавлении этой обёртки по какой-то причине не происходит перерисовка при изменении стейта
 */
export default function withPreloader(Component) {
    function mapStateToProps(state) {
        return {
            ...state.Preloader,
        }
    }

    return connect(mapStateToProps)(
        function (props) {
            if (props.preloaderIsToggledOn) {
                return <Preloader />
            } else {
                return Component
            }
        }
    )
}