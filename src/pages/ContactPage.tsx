import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContactList from '../components/contactList';
import {Heading} from "@chakra-ui/react";

const ContactPage = () => {
  const contacts = useSelector((state:any) => state.contacts);

  if (contacts.contacts.length === 0) {
    return (
        <>
            <Heading color={"black"} p={"10px 20px"} bg={'#f7f7f7'}>
               Contacts Page
            </Heading>
          <div className="flex flex-col items-center mt-8">
            <p className="text-2xl font-semibold mb-4">
              No contacts present at the moment.
            </p>
            <Link
              to="/add-contact/"
              className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            >
              Add Contact
            </Link>
          </div>
        </>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Contacts</h2>
        <Link
          to="/add-contact/"
          className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
        >
          Add Contact
        </Link>
      </div>
      <ContactList/>
    </div>
  );
};

export default ContactPage;
