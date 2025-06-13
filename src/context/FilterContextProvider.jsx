import { createContext, useContext, useMemo, useState } from "react";
import { SearchContext } from "./SearchContextProvider";
import React from 'react';

const extractPriceNumber = (property, isForRent) => {
  const priceStr = isForRent ? property.rent_price : property.price;
  if (!priceStr) return null;
  const num = parseInt(priceStr.replace(/[^\d]/g, ""), 10);
  return isNaN(num) ? null : num;
};

const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    location: "",
    priceRange: { min: null, max: null },
    bathrooms: null,
    bedrooms: null,
    areaRange: { min: null, max: null },
  });
  const { searchedProperties, searchCriteria } = useContext(SearchContext);

  const filteredResults = useMemo(() => {
    return searchedProperties.filter((property) => {
      const priceNum = extractPriceNumber(property, searchCriteria.for_rent);
      return (
        (!filterCriteria.location ||
          property.district === filterCriteria.location) &&
        (!filterCriteria.priceRange.min ||
          priceNum >= filterCriteria.priceRange.min) &&
        (!filterCriteria.priceRange.max ||
          priceNum <= filterCriteria.priceRange.max) &&
        (!filterCriteria.bathrooms ||
          property.bathrooms === filterCriteria.bathrooms) &&
        (!filterCriteria.bedrooms ||
          property.bedrooms === filterCriteria.bedrooms) &&
        (!filterCriteria.areaRange.min ||
          property.area_sqm >= filterCriteria.areaRange.min) &&
        (!filterCriteria.areaRange.max ||
          property.area_sqm <= filterCriteria.areaRange.max)
      );
    });
  }, [filterCriteria, searchedProperties, searchCriteria]);

  const districts = useMemo(() => {
    const districtsSet = new Set();
    searchedProperties.forEach((property) => {
      if (property.district) {
        districtsSet.add(property.district);
      }
    });
    return Array.from(districtsSet).sort();
  }, [searchedProperties]);

  const bedroomsNum = useMemo(() => {
    const bedroomsSet = new Set();
    searchedProperties.forEach((property) => {
      if (property.bedrooms) {
        bedroomsSet.add(property.bedrooms);
      }
    });
    return Array.from(bedroomsSet).sort();
  }, [searchedProperties]);

  const bathroomsNum = useMemo(() => {
    const bathroomsSet = new Set();
    searchedProperties.forEach((property) => {
      if (property.bathrooms) {
        bathroomsSet.add(property.bathrooms);
      }
    });
    return Array.from(bathroomsSet).sort();
  }, [searchedProperties]);

  const priceValues = useMemo(() => {
    const values = searchedProperties
      .map((property) => extractPriceNumber(property, searchCriteria.for_rent))
      .filter((num) => num !== null)
      .sort();
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  }, [searchedProperties, searchCriteria]);

  const areaValues = useMemo(() => {
    const areas = searchedProperties
      .map((property) => property.area_sqm)
      .filter((area) => area !== null && !isNaN(area));
    const minArea = Math.min(...areas);
    const maxArea = Math.max(...areas);
    return { minArea, maxArea };
  }, [searchedProperties]);

  const handleFilterReset = () => {
    setFilterCriteria({
      location: "",
      priceRange: { min: null, max: null },
      bathrooms: null,
      bedrooms: null,
      areaRange: { min: null, max: null },
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filterCriteria,
        setFilterCriteria,
        filteredResults,
        districts,
        bedroomsNum,
        bathroomsNum,
        priceValues,
        areaValues,
        handleFilterReset,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider, FilterContext };
