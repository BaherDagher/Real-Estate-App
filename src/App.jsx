import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import RealEstateContextProvider from './context/RealEstateContextProvider.jsx'
import PropertyDetails from './components/ProperyDetails/PropertyDetails.jsx'
import ThemeContextProvider from './context/ThemeContextProvider.jsx'
import Search from './components/Search/Search.jsx'
import Favourites from './components/Favourites/Favourites.jsx'
import FavouritesContextProvider from './context/FavouritesContextProvider.jsx'
import SearchContextProvider from './context/SearchContextProvider.jsx'
import ZonesContextProvider from './context/ZonesContextProvider.jsx'
import SelectedZone from './components/SelectedZone/SelectedZone.jsx'
import { FilterContextProvider } from './context/FilterContextProvider.jsx'
import NotFound from './components/NotFound/NotFound';
import ContactContextProvider from './context/ContactUsContextProvider.jsx'
import AdminRoute from './components/AdminRoute/AdminRoute.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx';
import PropertiesData from './components/Dashboard/PropertiesData.jsx';
import Form from './components/Dashboard/Form.jsx';
import Messages from './components/Dashboard/Messages.jsx';
import DashboardHome from './components/Dashboard/HomeDashboard/DashboardHome.jsx';
import PropertyEditor from './components/Dashboard/PropertyEditor.jsx';
import LoginForm from './components/Account/Loginform,';
import RegisterForm from './components/Account/Registerform';
import AuthContextProvider from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute/PublicRoute';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'zone/:district', element: <SelectedZone /> },
        { path: 'search', element: <Search /> },
        {
          path: 'favourites',
          element: (
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          )
        },
        { path: 'property/:id', element: <PropertyDetails /> },

        {
          path: 'login',
          element: (
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          ),
        },
        {
          path: 'register',
          element: (
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          ),
        },

        { path: '*', element: <NotFound /> },
      ]
    },
    {
      path: '/dashboard',
      element: (
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      ),
      children: [
        { index: true, element: <DashboardHome /> },
        { path: 'home', element: <DashboardHome /> },
        { path: 'propertiesData', element: <PropertiesData /> },
        { path: 'form', element: <Form /> },
        { path: 'messages', element: <Messages /> },
        { path: 'propertyManagement', element: <PropertyEditor /> },
      ]
    },
    {
      path: '/admin',
      element: <Navigate to="/dashboard" />
    }
  ]);

  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <FavouritesContextProvider>
            <RealEstateContextProvider>
              <SearchContextProvider>
                <ZonesContextProvider>
                  <FilterContextProvider>
                    <ContactContextProvider>
                      <RouterProvider router={router} />
                    </ContactContextProvider>
                  </FilterContextProvider>
                </ZonesContextProvider>
              </SearchContextProvider>
            </RealEstateContextProvider>
          </FavouritesContextProvider>
        </ThemeContextProvider >
      </AuthContextProvider>
    </>
  )
}

export default App
