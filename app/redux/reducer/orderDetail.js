const orderIntialState = {
    address: {},
    cardinfo: {},
    product: {},
    dileveryMethod: ''
}

export default function (state = orderIntialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'ADD':
            return {
                ...state,
                address: payload?.address,
                cardinfo: payload?.cardinfo,
                product: payload?.product,
                ordertype: payload?.ordertype
            }
        case 'REMOVE':
            return state
        default:
            return state
    }
}