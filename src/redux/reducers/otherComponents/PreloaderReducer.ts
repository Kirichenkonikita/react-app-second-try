import { GetActionsTypesFromActionCreatorObject } from "../../../api/getActionTypesFromACObject"
// constants
const TOGGLE_PRELOADER = "TOGGLE_PRELOADER"
// action creators
export const PreloaderActionCreators = {
    togglePreloader(preloaderIsToggledOn: boolean) {
        return {
            type: TOGGLE_PRELOADER,
            preloaderIsToggledOn,
        } as const
    }
}
type PreloaderActionType = GetActionsTypesFromActionCreatorObject<typeof PreloaderActionCreators>
// initial state
const initialState = { preloaderIsToggledOn: false }
type PreloaderStateType = typeof initialState
// reducer function
export default function PreloaderReducer(
    state: PreloaderStateType = initialState,
    action: PreloaderActionType
): PreloaderStateType {
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

