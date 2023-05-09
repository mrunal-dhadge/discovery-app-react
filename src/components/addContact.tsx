import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact } from '../store/contactSlice';
import { useLocation } from "react-router-dom";


  const AddContact =  () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.state?.id;
  const contacts = useSelector((state: any) => state.contacts);

  useEffect(() => {
    if (id) {
        const contact = contacts.contacts.find((contact: any) => contact.id === id);
      if (contact) {
        setUsername(contact.username);
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.email);
        setAbout(contact.about);
        setIsEditMode(true);
      }
    }
  }, [id, contacts]);

  const handleSubmit = (e : any) => {
    e.preventDefault();
    const contactId = isEditMode ? id : Math.random().toString(36).substr(2, 9);
    const newContact = { id:contactId, username, firstName,lastName,email,about};
    if (isEditMode) {
        dispatch(editContact(newContact))
    } else {
        dispatch(addContact(newContact))
    }
    navigate(`/contacts/`, {replace: true});
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-medium mb-4">{isEditMode ? 'Edit Contact' : 'Add Contact'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">UserName</label>
          <input type="text" id="username" name="usernmae" value={username} onChange={e => setUsername(e.target.value)} className="w-full border-gray-300 border-solid border-2 rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full border-gray-300 border-solid border-2 rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full border-gray-300 border-solid border-2 rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-gray-300 border-solid border-2 rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="about" className="block text-gray-700 font-medium mb-2">About </label>
          <input type="text" id="about" name="about" value={about} onChange={e => setAbout(e.target.value)} className="w-full border-gray-300 border-solid border-2 rounded-md px-4 py-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">{isEditMode ? 'Save Changes' : 'Add Contact'}</button>
      </form>
    </div>
  );
};



export default AddContact;
