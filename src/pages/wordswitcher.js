// src/components/WordSwitcher.js
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './WordSwitcher.css';

const words = ['Surveys!', 'Playing Games!', 'Watching Videos!', 'Sign Up Offers!'];

const WordSwitcher = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasDroppedIn, setHasDroppedIn] = useState(false);

  const props = useSpring({
    opacity: 15,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    reset: true,
    config: { duration: 500 },
    onRest: () => setHasDroppedIn(true), // Set hasDroppedIn to true when animation completes
  });

  useEffect(() => {
    if (!hasDroppedIn) return; // Wait until drop-in animation completes
    const word = words[index];
    let i = isDeleting ? word.length : 0;
    const interval = setInterval(() => {
      setCurrentWord(word.substring(0, i));
      if (!isDeleting && i < word.length) {
        i++;
      } else if (isDeleting && i > 0) {
        i--;
      } else if (isDeleting && i === 0) {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else if (!isDeleting && i === word.length) {
        setIsDeleting(true);
      }
    }, 200); // Typing speed

    return () => clearInterval(interval);
  }, [index, isDeleting, hasDroppedIn]);

  return (
    <animated.span style={props} className="word-switcher">
      {currentWord}
    </animated.span>
  );
};

export default WordSwitcher;
