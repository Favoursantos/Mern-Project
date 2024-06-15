import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ViewScreen = () => {
    const initialFormState = {
        fullName: '',
        matricNumber: '',
        email: '',
        message: '',
        department: '',
        photo: null // Add this for photo upload
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [contacts, setContacts] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

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
    
    const handleEdit = (index) => {
        const contactToEdit = contacts[index];
        setFormData({ ...contactToEdit });
        setEditIndex(index);
    };

    return (
        <Container>
            <h2 className="text-center my-4">Contacts List</h2>
            <Row>
                {contacts.map((contact, index) => (
                    <Col key={contact._id} md={4} className="mb-4">
                        <Card>
                            {contact.photo && <Card.Img variant="top" src={contact.photo} alt={contact.fullName} />}
                            <Card.Body>
                                <Card.Title>{contact.fullName}</Card.Title>
                                <Card.Text>
                                    <strong>Matric Number:</strong> {contact.matricNumber}<br />
                                    <strong>Email:</strong> {contact.email}<br />
                                    <strong>Department:</strong> {contact.department}<br />
                                    <strong>Message:</strong> {contact.message}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleEdit(index)} className="me-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(contact._id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default ViewScreen