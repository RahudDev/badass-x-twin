import React from 'react';
import Task from './Task';

const TaskList = ({ tasks }) => {
  return (
    <div className="row">
      {tasks.map(task => (
        <div className="col-md-4" key={task.id}>
          <Task task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
