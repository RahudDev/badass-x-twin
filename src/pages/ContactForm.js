import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner, Progress } from 'reactstrap';
import axios from 'axios';
import './contact.css';
import { API_URL } from '../App';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    description: '',
    category: '',
    attachments: null,
    acknowledge: false, // New state for acknowledgment checkbox
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [attachmentProgress, setAttachmentProgress] = useState(0);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));

    // If a file is selected, handle its upload progress
    if (name === 'attachments' && files) {
      const file = files[0];
      setUploadingAttachment(true);
      const reader = new FileReader();

      reader.onloadstart = () => {
        setAttachmentProgress(0);
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setAttachmentProgress(progress);
        }
      };

      reader.onloadend = () => {
        setUploadingAttachment(false);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset alert messages
    setAlertMessage('');
    setAlertType('');

    // Check if the acknowledgment checkbox is checked
    if (!formData.acknowledge) {
      setAlertMessage('Please acknowledge that the information provided is true and accurate.');
      setAlertType('warning');
      return;
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create a FormData object to send the form data
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);

    if (formData.attachments) {
      formDataToSend.append('attachment', formData.attachments);
    }

    try {
      setLoading(true); // Start loading spinner
      setUploadProgress(0); // Reset progress bar

      // Send POST request to the server with Authorization header
      await axios.post(`${API_URL}/api/contact`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'multipart/form-data', // Explicitly set Content-Type
        },
        onUploadProgress: (progressEvent) => {
          // Calculate and set the overall upload progress
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total);
          setUploadProgress(progress);
        },
      });

      // Handle success response
      setAlertMessage('Your message has been sent successfully!');
      setAlertType('success');

      // Clear form data and file input
      setFormData({
        email: '',
        subject: '',
        description: '',
        category: '',
        attachments: null,
        acknowledge: false, // Reset acknowledgment checkbox
      });

      // Reset file input value manually
      document.getElementById('attachments').value = '';

    } catch (error) {
      // Log the error for debugging
      console.error('Error submitting contact form:', error.response?.data || error.message);

      // Handle error response
      setAlertMessage('There was an error sending your message. Please try again later.');
      setAlertType('danger');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="container contact-us d-flex align-items-center justify-content-center min-vh-100">
    <div className="col-md-6">

      <h1 className="mb-4 text-center">Contact Us</h1>

      {alertMessage && (
        <Alert color={alertType} className="mt-3">
          {alertMessage}
        </Alert>
      )}

      {loading && (
        <div className="text-center mt-3">
          <Spinner color="primary" /> {/* Show spinner while loading */}
        </div>
      )}

      {uploadProgress > 0 && !loading && !uploadingAttachment && (
        <div className="mt-3">
          <Progress value={uploadProgress} />
        </div>
      )}

      {uploadingAttachment && (
        <div className="mt-3">
          <Label for="attachmentProgress">Attachment Upload Progress</Label>
          <Progress value={attachmentProgress} />
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">
            Your Email Address <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="subject">
            Subject <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">
            Description <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Enter your message"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', minHeight: '200px' }} // Adjust width and height as needed
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">
            Category <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Survey">Survey</option>
            <option value="Watching Videos">Watching Videos</option>
            <option value="Sign Up Offers">Sign Up Offers</option>
            <option value="Other">Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="attachments">Attachments<span style={{ color: 'red' }}>*</span></Label>
          <Input
            type="file"
            name="attachments"
            id="attachments"
            onChange={handleChange}
            accept="image/jpeg, image/png" // Restrict file types to JPEG and PNG
            required
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="acknowledge"
              id="acknowledge"
              checked={formData.acknowledge}
              onChange={handleChange}
              required
            />{' '}
            I affirm that all provided information is true and accurate to my knowledge. Submitting false claims, duplicative inquiries, or disrespectful communication may result in account termination and legal consequences. <span style={{ color: 'red' }}>*</span>
          </Label>
        </FormGroup>
        <Button type="submit" color="primary" className="mt-3">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  );
};

export default ContactForm;
