import React, { useRef } from 'react';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import { HandlePageClick } from '../App';

const Tasks = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isLoggedIn = storeinfo === 'true';
  const ref = useRef();
  const navigate = useNavigate();

  const tasks = [
    {
      id: 1,
      title: 'Survey Task',
      description: 'Complete a survey and earn $CUAN.',
      image: 'https://od.lk/s/NjFfODI4MTUwOTZf/person%20survey.jpeg',
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/survey-tasks' : '/signup', ref, navigate),
    },
    {
      id: 2,
      title: 'Play a Game',
      description: 'Play a square game and earn $CUAN.',
      image: 'https://od.lk/s/NjFfODUzMDU0ODdf/square%20image.jpg',
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/mainpage' : '/signup', ref, navigate),
    },
    {
      id: 3,
      title: 'Sign Up Offer',
      description: 'Sign up for services and earn $CUAN.',
      image: 'https://od.lk/s/NjFfODI4MTUwOTVf/people%20dollar.jpg',
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/cpalead' : '/signup', ref, navigate),
    },
  ];

  return (
    <div className={`container mt-5 about-us ${!isLoggedIn ? 'animate-slide' : ''}`}>
      <h1 className="mb-4">Available Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
