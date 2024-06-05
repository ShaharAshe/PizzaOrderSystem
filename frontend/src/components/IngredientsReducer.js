/**
 * Reducer function for managing state related to pizza ingredients.
 *
 * @param {Object} state - Current state.
 * @param {Object} action - Action dispatched to the reducer.
 * @returns {Object} New state.
 */
export function IngredientsReducer(state, action) {
    switch (action.type) {
        // Increment count of selected ingredients
        case 'INCREMENT_C':
            return { ...state, count: state.count + 1 };
        // Decrement count of selected ingredients
        case 'DECREMENT_C':
            return { ...state, count: state.count - 1 };
        // Toggle ingredient selection
        case 'INGREDIENT':
            const name = action.payload;
            const countChange = state.names[name] ? state.count-1 : state.count+1;
            return {
                ...state,
                names: { ...state.names, [name]: !state.names[name] },
                count: countChange
            };
        // Initialize ingredient names
        case 'INIT_NAMES':
            return { ...state, names: action.payload, count: 0 };
        // Initialize state
        case 'INIT':
            let tempInitNames = {}
            Object.keys(state.names).forEach(key=>{
                tempInitNames = {...tempInitNames, [key]:false};
            });
            return { ...state, names: tempInitNames, count: 0 };
        default:
            return state;
    }
}