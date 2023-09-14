import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AccountsPage from './components/pages/accounts-page/AccountsPage';
import CategoriesPage from './components/pages/categories-page/CategoriesPage';
import PaychecksPage from './components/pages/paychecks-page/PaychecksPage';
import TransactionsPage from './components/pages/transactions-page/TransactionsPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountsPage />,
  },
  {
    path: "/accounts",
    element: <AccountsPage />,
  },
  {
    path: "/paychecks",
    element: <PaychecksPage />,
  },
  {
    path: "/transactions",
    element: <TransactionsPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
]);


const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
