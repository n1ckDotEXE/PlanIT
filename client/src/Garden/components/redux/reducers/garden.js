const initialState = null
function gardenReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_GARDEN':
            return action.payload;
        case 'CLEAR_GARDEN':
            return null;
        default:
            return state;
    }
}
export default gardenReducer;