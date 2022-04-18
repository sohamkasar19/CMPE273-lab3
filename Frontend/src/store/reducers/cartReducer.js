import { combineReducers } from "redux";
import {
  ADD_TO_CART,
  CHECKOUT_CART,
  ADD_QUANTITY,
  REMOVE_ITEM,
  SUB_QUANTITY,
} from "../actions/action-types/user-actions";

const initState = {
  addedItems: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
    if(action.type === ADD_TO_CART) {
        let itemToAdd = action.payload.item;
      let existing_item = state.addedItems.find(
        (item) => item._id === itemToAdd._id
      );
      let itemPrice = Number(itemToAdd.PRICE);
      let quantity = Number(action.payload.quantity);
      let totalItemPrice = itemPrice * quantity;
      if (existing_item) {
        itemToAdd.quantityInCart += quantity;
        // state.addedItems.push(itemToAdd);
        let newTotal = state.total + totalItemPrice;
        return {
          ...state,
          total: newTotal,
        };
      }
      else {
        itemToAdd.quantityInCart = quantity;
        state.addedItems.push(itemToAdd);
        let newTotal = state.total + totalItemPrice;
        return {
          ...state,
          total: newTotal,
        };
      }
    }

    else if(action.type === CHECKOUT_CART) {

    }

    else if(action.type === REMOVE_ITEM) {

    }

    else if(action.type === ADD_QUANTITY) {
        let id = action.payload;
        let item_add_quantity = state.addedItems.find(item=> item._id === id)
        item_add_quantity.quantityInCart += 1;
        let newTotal = state.total + item_add_quantity.PRICE
        return{
            ...state,
            total: newTotal
        }
    }

    else if(action.type === SUB_QUANTITY) {
        let id = action.payload;
        let item_sub_quantity = state.addedItems.find(item=> item._id === id) 
        //if the qt == 0 then it should be removed
        if(item_sub_quantity.quantityInCart === 1){
            let new_items = state.addedItems.filter(item=>item._id !== id)
            let newTotal = state.total - item_sub_quantity.PRICE
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            item_sub_quantity.quantityInCart -= 1
            let newTotal = state.total - item_sub_quantity.PRICE
            return{
                ...state,
                total: newTotal
            }
        }
    }
    else {
        return state
    }
  }

  //INSIDE HOME COMPONENT
//   if (action.type === ADD_TO_CART) {
//     // let addedItem = state.items.find((item) => item.id === action.id);
//     console.log(state);
//     let itemToAdd = action.item;
//     //check if the action id exists in the addedItems
//     let existed_item = state.addedItems.find(
//       (item) => item.ItemId === itemToAdd.ItemId
//     );
//     let itemPrice = Number(itemToAdd.Price);
//     let quantity = Number(action.quantity);
//     let totalItemPrice = itemPrice * quantity;
//     console.log(itemPrice + " " + typeof itemPrice);
//     if (existed_item) {
//       itemToAdd.quantityInCart += quantity;
//       // state.addedItems.push(itemToAdd);
//       let newTotal = state.total + totalItemPrice;
//       return {
//         ...state,
//         total: newTotal,
//       };
//     } else {
//       itemToAdd.quantityInCart = quantity;
//       //calculating the total
//       state.addedItems.push(itemToAdd);
//       console.log(state);
//       let newTotal = state.total + totalItemPrice;
//       return {
//         ...state,
//         // addedItems: [...state.addedItems, itemToAdd],
//         total: newTotal,
//       };
//     }
//   } else if (action.type === CHECKOUT_CART) {
//     return {
//       currency: state.currency,
//       addedItems: [],
//       total: 0,
//     };
//   } else if (action.type === CHANGE_CURRENCY) {
//     return {
//       ...state,
//       currency: action.currency,
//     };
//   }

  // if (action.type === REMOVE_ITEM) {
  //   let itemToRemove = state.addedItems.find((item) => action.id === item.id);
  //   let new_items = state.addedItems.filter((item) => action.id !== item.id);

  //   //calculating the total
  //   let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;

  //   return {
  //     ...state,
  //     addedItems: new_items,
  //     total: newTotal,
  //   };
  // }
//   else {
//     return state;
//   }
// };

export default combineReducers({ cartReducer });
