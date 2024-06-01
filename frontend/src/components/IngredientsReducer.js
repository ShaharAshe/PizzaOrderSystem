export function IngredientsReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT_C':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT_C':
            return { ...state, count: state.count - 1 };
        case 'INGREDIENT':
            const name = action.payload;
            return {
                ...state,
                names: { ...state.names, [name]: !state.names[name] },
                count: state.count
            };
        case 'INIT':
            return { ...state, names: action.payload, count: 0 };
        default:
            return state;
    }
}