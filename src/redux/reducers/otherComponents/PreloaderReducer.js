const TOGGLE_PRELOADER = "TOGGLE_PRELOADER"

export function togglePreloader(preloaderIsToggledOn) {
    return {
        type: TOGGLE_PRELOADER,
        preloaderIsToggledOn,
    }
}

let initialPreloaderState = {
    preloaderIsToggledOn: false,
}

export default function PreloaderReducer(state = initialPreloaderState, action) {
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

