import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { createContext } from "react";


export const ZonesContext = createContext();

const ZonesContextProvider = ({ children }) => {

    const [zonesList, setZonesList] = useState([]);


    const getAllZones = async () => {
        const { data } = await axios.get("https://684b43c2165d05c5d35c002f.mockapi.io/propertiesApi/zones");
        setZonesList(data);
    }


    useEffect(() => {
        getAllZones()
    }, [])


    return (
        <ZonesContext.Provider value={{ zonesList }}>
            {children}
        </ZonesContext.Provider>
    );
}

export default ZonesContextProvider;
