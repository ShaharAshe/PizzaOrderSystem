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