import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import inventoryReducer from './Pages/Inventory/inventory-slice';
import orderDMReducer from './Pages/DeliveryManager/orderDM-slice';
import orderSupReducer from './Pages/Supplier/orderSup-slice';
import purchaseOrdersForApprovingReducer from './Pages/PurchaseOrdersForApproving/purchase-orders-for-approving-slice';
import inventoriesReducer from './Pages/InventoryM/inventory-slice';
import policyReducer from './Pages/Policies/policiesSlice';
import usersReducer from './Pages/LoginSignup/user-slice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    inventory: inventoryReducer,
    purchaseOrdersForApproving: purchaseOrdersForApprovingReducer,
    orderDM: orderDMReducer,
    orderSup: orderSupReducer,
    inventories: inventoriesReducer,
    users:usersReducer,
    policies: policyReducer
  });
}
