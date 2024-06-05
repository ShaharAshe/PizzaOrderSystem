/**
 * Reducer function for managing the price state.
 * @param {Object} state - The current state.
 * @param {Object} action - The action to be performed.
 * @returns {Object} - The new state.
 */
export function PriceReducer(state, action){
    switch (action.type) {
        case 'INCREMENT':
            return { price: state.price + 3 };
        case 'DECREMENT':
            return { price: state.price - 3 };
        case 'INIT':
            return { price: 55 };
        default:
            return state;
    }
}