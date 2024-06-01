export function IngredientsReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT_C':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT_C':
            return { ...state, count: state.count - 1 };
        case 'INGREDIENT':
            const name = action.payload;
            const countChange = state.names[name] ? state.count-1 : state.count+1;
            return {
                ...state,
                names: { ...state.names, [name]: !state.names[name] },
                count: countChange
            };
        case 'INIT_NAMES':
            return { ...state, names: action.payload, count: 0 };
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