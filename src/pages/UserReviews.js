// src/components/UserReviews.js
import React, { useEffect, useRef } from 'react';
import './UserReviews.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const reviews = [
  { id: 1, name: "Alice", review: "This platform is amazing! I earned rewards quickly." },
  { id: 2, name: "Bob", review: "Easy to use and great rewards. Highly recommended!" },
  { id: 3, name: "Charlie", review: "I love playing games and earning money at the same time!" },
  { id: 4, name: "Diana", review: "The best survey site I've used so far. Kudos!" },
  { id: 5, name: "Eve", review: "Great way to earn extra cash. The tasks are simple." },
  { id: 6, name: "Frank", review: "Watching videos and getting paid? Count me in!" },
  { id: 7, name: "Grace", review: "The rewards are fantastic, and cash out is easy." },
  { id: 8, name: "Hank", review: "An excellent platform for earning rewards in your spare time." },
  { id: 9, name: "Ivy", review: "I’ve earned so many gift cards, it’s unbelievable!" },
  { id: 10, name: "Jack", review: "Great customer support and fast payouts. Love it!" }
];

const UserReviews = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let isMouseOver = false;
    const slide = () => {
      if (!isMouseOver) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(slide, 20);
    
    slider.addEventListener('mouseover', () => {
      isMouseOver = true;
    });

    slider.addEventListener('mouseout', () => {
      isMouseOver = false;
    });

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="user-reviews-slider mt-5">
      <div className="container-review">
        <h2 className="user-reviews-heading mb-4 text-center">User Reviews</h2>
        <div className="slider-wrapper" ref={sliderRef}>
          <div className="slider-content">
            {reviews.concat(reviews).map((review, index) => (
              <div key={index} className="user-review-slide">
                <div className="card user-review-card h-100">
                  <div className="card-body">
                    <h5 className="user-review-name">{review.name}</h5>
                    <p className="user-review-content">{review.review}</p>
                    <div className="user-review-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="user-review-star">&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReviews;
