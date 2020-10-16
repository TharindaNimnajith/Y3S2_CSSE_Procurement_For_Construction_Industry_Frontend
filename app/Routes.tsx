import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import routes from './constants/routes.json';
import HomePage from './containers/HomePage';
import InventoryPage from './Pages/Inventory/inventory-page';
import InventorysPage from './Pages/InventoryM/inventory-page';
import PurchaseOrdersForApprovingPage from './Pages/PurchaseOrdersForApproving/purchase-orders-for-approving-page';
import PurchaseOrdersApprovedList from './Pages/PurchaseOrdersForApproving/purchase-orders-approved-list';
import PurchaseOrdersRejectedList from './Pages/PurchaseOrdersForApproving/purchase-orders-rejected-list';
import DeliveryConfirmedOrdersList from './Pages/DeliveryManager/delivery-confirmed-orders-list';
import DeliveryRejectedOrdersList from './Pages/DeliveryManager/delivery-rejected-orders-list';
import OrdersForDeliveryConfirmedList from './Pages/DeliveryManager/orders-for-delivery-confirmed-list';
import MakePayment from './Pages/DeliveryManager/makePayment';
import PaymentList from './Pages/DeliveryManager/paymentList';
import OrdersForSupplingList from './Pages/Supplier/orders-for-suppling-list';
import DeliveredOrdersSupList from './Pages/Supplier/delivered-orders-sup-list';
import RejectedOrdersSupList from './Pages/Supplier/rejected-orders-sup-list';
import GenerateInvoice from './Pages/Supplier/generateInvoice';
import Policy from './Pages/Policies/policies';

const LazyCounterPage = React.lazy(() =>
  import('./containers/HomePage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER}
               component={CounterPage} />
        <Route path={routes.INVENTORY}
               component={InventoryPage} />
        <Route path={routes.INVENTORYS}
               component={InventorysPage} />
        <Route path={routes.PURCHASE_ORDERS_FOR_APPROVING}
               component={PurchaseOrdersForApprovingPage} />
        <Route path={routes.CONFIRMED_PS_LIST}
               component={PurchaseOrdersApprovedList} />
        <Route path={routes.REJECTED_PS_LIST}
               component={PurchaseOrdersRejectedList} />
        <Route path={routes.PENDING_DM_LIST}
               component={OrdersForDeliveryConfirmedList} />
        <Route path={routes.CONFIRMED_DM_LIST}
               component={DeliveryConfirmedOrdersList} />
        <Route path={routes.REJECTED_DM_LIST}
               component={DeliveryRejectedOrdersList} />
        <Route path={routes.MAKE_PAYMENT}
               component={MakePayment} />
        <Route path={routes.PAYMENT_LIST}
               component={PaymentList} />
        <Route path={routes.PENDING_SUP_LIST}
               component={OrdersForSupplingList} />
        <Route path={routes.CONFIRMED_SUP_LIST}
               component={DeliveredOrdersSupList} />
        <Route path={routes.REJECTED_SUP_LIST}
               component={RejectedOrdersSupList} />
        <Route path={routes.GENERATE_INVOICE}
               component={GenerateInvoice} />
        <Route path={routes.POLICY}
               component={Policy} />
        <Route path={routes.HOME}
               component={HomePage} />
      </Switch>
    </App>
  );
}
