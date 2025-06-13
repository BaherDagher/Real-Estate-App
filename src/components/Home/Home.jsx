import "./Home.css"
import { useContext, useEffect } from 'react';
import { RealEstateContext } from '../../context/RealEstateContextProvider.jsx';
import Loader from '../Loader/Loader.jsx';
import HeroImage from '../HeroImage/HeroImage.jsx';
import FeaturedToday from '../FeaturedToday/FeaturedToday.jsx';
import AllProperites from '../AllProperites/AllProperites.jsx';
import axios from "axios";
import Zones from "../Zones/Zones.jsx";
import Contactus from "../ContactUs/Contactus.jsx";
import { useLocation } from "react-router-dom";
import { Element } from "react-scroll";
import React from 'react';


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  const { allProperties } = useContext(RealEstateContext)

  if (!allProperties.length) return <Loader />

  return (
    <>
      <HeroImage />
      <FeaturedToday />
      <Zones />

      <Element name="contactSection">
        <Contactus />
      </Element>
    </>
  );

}

export default Home;
