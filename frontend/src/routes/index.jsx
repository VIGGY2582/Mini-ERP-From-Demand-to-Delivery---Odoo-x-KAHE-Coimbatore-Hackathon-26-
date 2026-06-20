import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './PublicRoute.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Unauthorized from '../pages/Unauthorized.jsx';
import NotFound from '../pages/NotFound.jsx';
import ModulePlaceholder from '../pages/ModulePlaceholder.jsx';
import Categories from '../pages/categories/Categories.jsx';
import Vendors from '../pages/vendors/Vendors.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Publicly Accessible Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected ERP Operations Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<ModulePlaceholder moduleName="Employees" />} />
          <Route path="roles" element={<ModulePlaceholder moduleName="Roles" />} />
          <Route path="products" element={<ModulePlaceholder moduleName="Products" />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customers" element={<ModulePlaceholder moduleName="Customers" />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="inventory" element={<ModulePlaceholder moduleName="Inventory" />} />
          <Route path="sales" element={<ModulePlaceholder moduleName="Sales" />} />
          <Route path="purchase" element={<ModulePlaceholder moduleName="Purchase" />} />
          <Route path="bom" element={<ModulePlaceholder moduleName="BOM" />} />
          <Route path="manufacturing" element={<ModulePlaceholder moduleName="Manufacturing" />} />
          <Route path="stock-ledger" element={<ModulePlaceholder moduleName="Stock Ledger" />} />
          <Route path="audit" element={<ModulePlaceholder moduleName="Audit Logs" />} />
          <Route path="reports" element={<ModulePlaceholder moduleName="Reports" />} />
        </Route>
      </Route>

      {/* Error and Handling Pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
export { AppRoutes };
