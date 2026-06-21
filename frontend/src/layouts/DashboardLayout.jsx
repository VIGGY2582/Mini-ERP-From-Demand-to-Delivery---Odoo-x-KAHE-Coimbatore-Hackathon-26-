import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FiGrid, FiUsers, FiBox, FiFolder, FiShoppingBag, FiTruck, 
  FiLayers, FiDollarSign, FiShoppingCart, FiList, FiCpu, 
  FiFileText, FiActivity, FiPieChart, FiLogOut, FiMenu, FiX, FiUser,
  FiBell
} from 'react-icons/fi';
import { Dropdown, Badge } from 'react-bootstrap';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid /> },
    { name: 'Employees', path: '/dashboard/employees', icon: <FiUsers /> },
    { name: 'Roles', path: '/dashboard/roles', icon: <FiActivity /> },
    { name: 'Products', path: '/dashboard/products', icon: <FiBox /> },
    { name: 'Categories', path: '/dashboard/categories', icon: <FiFolder /> },
    { name: 'Customers', path: '/dashboard/customers', icon: <FiShoppingBag /> },
    { name: 'Vendors', path: '/dashboard/vendors', icon: <FiTruck /> },
    { name: 'Inventory', path: '/dashboard/inventory', icon: <FiLayers /> },
    { name: 'Sales', path: '/dashboard/sales', icon: <FiDollarSign /> },
    { name: 'Purchase', path: '/dashboard/purchase', icon: <FiShoppingCart /> },
    { name: 'BOM', path: '/dashboard/bom', icon: <FiList /> },
    { name: 'Manufacturing', path: '/dashboard/manufacturing', icon: <FiCpu /> },
    { name: 'Stock Ledger', path: '/dashboard/stock-ledger', icon: <FiFileText /> },
    { name: 'Audit Logs', path: '/dashboard/audit', icon: <FiActivity /> },
    { name: 'Reports', path: '/dashboard/reports', icon: <FiPieChart /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="container-fluid p-0 d-flex vh-100 overflow-hidden">
      {/* Sidebar - Desktop and Mobile overlay */}
      <div className={`bg-dark text-white d-flex flex-column transition-all sidebar-height ${
        sidebarOpen ? 'd-flex position-absolute z-3 w-75 h-100' : 'd-none d-md-flex'
      }`} style={{ width: sidebarOpen ? '75%' : '260px', minWidth: '260px' }}>
        
        {/* Sidebar Header */}
        <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center bg-dark">
          <Link to="/dashboard" className="text-white text-decoration-none fw-bold fs-4 d-flex align-items-center gap-2">
            <FiCpu className="text-primary" /> Mini ERP
          </Link>
          {sidebarOpen && (
            <button className="btn btn-outline-light d-md-none border-0" onClick={toggleSidebar}>
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* Sidebar Items */}
        <div className="flex-grow-1 overflow-y-auto py-3">
          <ul className="nav nav-pills flex-column px-2 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="nav-item">
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`nav-link text-white d-flex align-items-center gap-3 px-3 py-2 rounded ${
                      isActive ? 'active bg-primary' : 'hover-opacity'
                    }`}
                    style={!isActive ? { opacity: 0.75 } : {}}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-top border-secondary bg-dark">
          <button 
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-grow-1 d-flex flex-column vh-100 overflow-hidden">
        {/* Top Navbar */}
        <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 py-2 flex-shrink-0">
          <div className="container-fluid p-0">
            {/* Toggle mobile sidebar */}
            <button 
              className="btn btn-outline-dark d-md-none me-2" 
              onClick={toggleSidebar}
              aria-label="Toggle Navigation"
            >
              <FiMenu size={20} />
            </button>

            {/* Title / Info */}
            <span className="navbar-text fw-semibold d-none d-sm-inline-block text-secondary">
              Enterprise Management Platform
            </span>

            {/* Profile Dropdown */}
            <div className="ms-auto d-flex align-items-center gap-3">
              {/* Notification Icon */}
              <button className="btn btn-link text-dark position-relative p-0 border-0">
                <FiBell size={20} />
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.5rem', padding: '0.2rem 0.35rem' }}
                >
                  3
                </Badge>
              </button>

              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="light" 
                  className="d-flex align-items-center gap-2 border-0 bg-transparent"
                  id="user-dropdown"
                >
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle border d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <FiUser size={20} className="text-primary" />
                  </div>
                  <div className="text-start d-none d-sm-block">
                    <div className="fw-bold text-dark small">{user?.name || 'Administrator'}</div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{user?.email || 'admin@erp.com'}</div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/dashboard')}>
                    <FiGrid className="me-2" />
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <FiLogOut className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-grow-1 overflow-y-auto bg-light p-3 p-md-4 content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
