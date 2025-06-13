import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {

  const [contactMessages, setContactMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('https://684b43c2165d05c5d35c002f.mockapi.io/propertiesApi/ContactUs');
      setContactMessages(data || []);
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    }
  };

  const addContactMessage = async (newMessage) => {
    try {
      const { data } = await axios.post('https://684b43c2165d05c5d35c002f.mockapi.io/propertiesApi/ContactUs', newMessage);
      setContactMessages(prev => [...prev, data]);
      toast.success("Message added successfully!");
    } catch (error) {
      toast.error("Failed to add message to server");
      console.error("Error posting to json-server:", error);
    }
  };

  const removeContactMessage = async (newMessage) => {
    console.log(newMessage)
    try {
      const updated = contactMessages.filter((message) => message.id !== newMessage.id);
      setContactMessages(updated);

      await axios.delete(`https://684b43c2165d05c5d35c002f.mockapi.io/propertiesApi/ContactUs/${newMessage.id}`);
      toast.success("Removed from Contact List");

    } catch (error) {
      console.error("Failed to remove from Contact List", error);
      toast.error("Error removing message from Contact List");
    }
  };


  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ContactContext.Provider value={{ contactMessages, addContactMessage, removeContactMessage, fetchMessages }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;