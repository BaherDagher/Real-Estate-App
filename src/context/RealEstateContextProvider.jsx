import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContext } from "react";


export const RealEstateContext = createContext();

const RealEstateContextProvider = ({ children }) => {

    const [allProperties, setAllProperties] = useState([])

    const getAllProperties = async () => {
        const { data } = await axios.get("https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/all");
        setAllProperties(data);
    }

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/all/${id}`);
            setAllProperties(prevProperties => prevProperties.filter(property => property.id !== id));
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    }


    const updateProperty = async (id, updatedData) => {
        try {
            const { data } = await axios.put(`https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/all/${id}`, updatedData);
            setAllProperties(prevProperties =>
                prevProperties.map(property =>
                    property.id === id ? { ...property, ...data } : property
                )
            );
        } catch (error) {
            console.error('Error updating property:', error);
        }
    }

    useEffect(() => {
        getAllProperties()
    }, [])


    return (
        <>
            <RealEstateContext.Provider value={{ getAllProperties, allProperties, deleteProperty, updateProperty }}>
                {children}
            </RealEstateContext.Provider>
        </>
    );
}

export default RealEstateContextProvider;
