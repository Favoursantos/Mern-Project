import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewScreen = () => {
    
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://mern-project-backend-xtdt.onrender.com/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };


  return (
    <div>
        <h2>Contacts List</h2>
    <ul className='form'>
        {contacts.map((contact, index) => (
            <li key={contact._id} className='form-control'>
                <div>
                    {contact.photo && <img src={contact.photo} alt={contact.fullName} width="100" />}
                    <div>{contact.fullName} {contact.matricNumber} {contact.email} {contact.department} {contact.message}</div>
                </div>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(contact._id)}>Delete</button>
            </li>
        ))}
    </ul>
    </div>
  )
}
export default ViewScreen