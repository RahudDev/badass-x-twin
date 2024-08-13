import React from 'react';

const TaskDetail = () => {
  const task = { title: 'Task Title', description: 'This is the detailed description of the task.', image: 'https://od.lk/s/NjFfODI4MTUwOTZf/person%20survey.jpeg' };

  return (
    <div className="container mt-5">
      <div className="card">
        <img src={task.image} className="card-img-top" alt={task.title} />
        <div className="card-body">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
