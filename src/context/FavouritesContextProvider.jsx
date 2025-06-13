import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const FavouritesContext = createContext();

const FavouritesContextProvider = ({ children }) => {
  const [favouriteList, setFavouriteList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // Fetch all favourites on load or user login
  const fetchFavouriteList = async () => {
    try {
      const { data } = await axios.get(
        'https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/favourites'
      );
      setFavouriteList(data || []);
    } catch (err) {
      console.error('Error loading Favourite List from server', err);
    }
  };

  // Add property to favourites
  const addToFavouriteList = async (newProperty) => {
    if (!currentUser || !['user', 'admin'].includes(currentUser.role)) {
      toast.warn('Login to add property to favourites!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }

    const alreadyAdded = favouriteList.some(
      (fav) => fav.propertyId === newProperty.id
    );

    if (alreadyAdded) {
      toast.info('This Property is already in your Favourite!');
      return;
    }

    try {
      const response = await axios.post(
        'https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/favourites',
        {
          ...newProperty,
          propertyId: newProperty.id, // Save original ID for routing
        }
      );

      setFavouriteList((prev) => [...prev, response.data]);
      toast.success('Added to Favourites!');
    } catch (error) {
      toast.error('Failed to add property to server');
      console.error('Error posting to favourites:', error);
    }
  };

  // Remove property from favourites
  const removeFromFavouriteList = async (propertyToRemove) => {
    if (!currentUser || !['user', 'admin'].includes(currentUser.role)) {
      toast.warn('You must be logged in as a user or admin to remove favourites.');
      return;
    }

    // Find correct favourite item by propertyId
    const favItem = favouriteList.find(
      (fav) => fav.propertyId === propertyToRemove.id
    );

    if (!favItem) {
      toast.warn('Property not found in your favourites.');
      return;
    }

    try {
      await axios.delete(
        `https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/favourites/${favItem.id}`
      );

      setFavouriteList((prev) =>
        prev.filter((fav) => fav.id !== favItem.id)
      );

      toast.success('Removed from Favourite List');
    } catch (error) {
      console.error('Failed to remove from Favourite List', error);
      toast.error('Error removing property from Favourite List');
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFavouriteList();
    } else {
      setFavouriteList([]);
    }
  }, [currentUser]);

  return (
    <FavouritesContext.Provider
      value={{ favouriteList, addToFavouriteList, removeFromFavouriteList }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;