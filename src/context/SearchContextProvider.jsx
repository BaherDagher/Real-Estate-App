import { createContext, useState, useMemo, useContext } from "react";
import { RealEstateContext } from "./RealEstateContextProvider";
import React from 'react';


export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const { allProperties } = useContext(RealEstateContext);

  const [searchCriteria, setsearchCriteria] = useState({
    name: "",
    city: "",
    developer: "",
    property_type: "",
    for_rent: false,
  });

  const searchedProperties = useMemo(() => {
    return allProperties.filter((property) => {
      return (
        property.for_rent === searchCriteria.for_rent &&
        (!searchCriteria.name || property.name === searchCriteria.name) &&
        (!searchCriteria.city ||
          property.city === searchCriteria.city) &&
        (!searchCriteria.developer ||
          property.developer === searchCriteria.developer) &&
        (!searchCriteria.property_type ||
          property.property_type === searchCriteria.property_type)
      );
    });
  }, [allProperties, searchCriteria]);

  const handleSearchReset = () => {
    setsearchCriteria({
      name: "",
      city: "",
      developer: "",
      property_type: "",
      for_rent: false,
    });
  };

  return (
    <SearchContext.Provider
      value={{
        searchCriteria,
        setsearchCriteria,
        searchedProperties,
        handleSearchReset,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
