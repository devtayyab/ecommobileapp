import { ADD_TO_CART, REMOVE_FROM_CART } from "../cartAction"; //action

const intiialState = {
    cartItems: [] // multiple
}


export default function (state = intiialState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_TO_CART:
            console.log(payload)
            const findId = state.cartItems.find((item) => item?.id == payload?.id)
            if (findId) {
                console.log(findId)
                const filter = state.cartItems.filter((item) => item.id !== payload.id)

                return {
                    ...state,
                    cartItems: [...filter, { ...findId, itemQuantity: findId.itemQuantity + 1 }]
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...payload, itemQuantity: 1 }]
                }
            }
        case REMOVE_FROM_CART:
            const itemsLeft = state.cartItems?.filter((item, index) => {
                console.log(payload)
                if (item?.id != payload)

                    return { ...item, itemQuantity: 1 }
            })
            console.log({ itemsLeft });
            return {
                ...state,
                cartItems: [...itemsLeft]
            }
        default:
            return state
    }

} 