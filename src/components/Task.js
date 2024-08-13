import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Task.css'; // Import the CSS file

const Task = ({ task }) => {

  return (
    <Card className={`shadow-sm task-card`}>
      <Card.Img variant="top" src={task.image} className="task-image" />
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Button variant="primary" onClick={task.onClick}>
          Go to Task
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
