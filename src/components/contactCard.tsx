import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../store/contactSlice';
import {useNavigate} from 'react-router-dom';

const ContactList = () => {
  const contacts = useSelector((state: any) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (id: string) => {
    navigate(`/add-contact/`, { state: {id: id}, replace: true});
  };

  return (
    <div>
      {contacts.contacts.map((contact : any) => (
        <div key={contact.id} className="bg-white p-6 rounded-md shadow-md flex mt-2">
          <div className="ml-2 mr-5">
            <h2 className="text-2xl font-bold text-gray-800">{contact.firstName} {contact.lastName}</h2>
            <h4 className="text-s text-gray-600">{contact.username}</h4>
            <h3 className="text-s text-gray-500">{contact.email}</h3>
          </div>
          <div className="mt-4 flex space-x-4 my-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEdit(contact.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;