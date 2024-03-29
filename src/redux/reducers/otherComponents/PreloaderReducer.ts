// constants
const TOGGLE_PRELOADER = "TOGGLE_PRELOADER"
// action creators
export function togglePreloader(preloaderIsToggledOn: boolean) {
    return {
        type: TOGGLE_PRELOADER,
        preloaderIsToggledOn,
    }
}
// action types
type TogglePreloaderActionType = {
    type: string
    preloaderIsToggledOn: boolean
}

type SummaryActionType = TogglePreloaderActionType
// reducer function
export default function PreloaderReducer(state = {preloaderIsToggledOn: false}, action: SummaryActionType) {
    switch (action.type) {
        case TOGGLE_PRELOADER:
            {
                return {
                    ...state,
                    preloaderIsToggledOn: action.preloaderIsToggledOn,
                }   
            }
        default:
            return state
    }
}

