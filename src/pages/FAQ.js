// src/components/FAQ.js
import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';

const FAQ = () => {
  const faqRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = faqRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          element.classList.add('visible');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is Free Cuan?',
      answer: 'Free Cuan is a platform where you can earn rewards by completing simple tasks like surveys, playing games, and watching videos.'
    },
    {
      question: 'How do I sign up?',
      answer: 'You can sign up by creating a free account on our website. It’s quick and easy!'
    },
    {
      question: 'How can I earn rewards?',
      answer: 'You can earn rewards by participating in various tasks like surveys, games, and videos. The more tasks you complete, the more rewards you earn.'
    },
    {
      question: 'When can I cash out?',
      answer: 'You can cash out your rewards once you have accumulated a minimum balance. Rewards can be redeemed for cash, gift cards, and other exciting offers.'
    },
    {
      question: 'Is Free Cuan available on mobile?',
      answer: 'Yes, Free Cuan is fully responsive and can be accessed on mobile devices for easy use on the go.'
    },
    {
      question: "Does FreeCuan is legit to use?",
      answer: "Yes, FreeCuan is absolutely legit. We partner with reputable brands and advertisers to bring you genuine opportunities to earn rewards. Our platform is transparent about how you earn and redeem rewards, and we have a growing community of satisfied users who have successfully earned and cashed out their rewards. We take your privacy and security seriously, ensuring that your data is protected at all times."
    }
  ];

  return (
    <section ref={faqRef} className="faq-section my-5">
      <div className="container">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqData.map((item, index) => (
            <div key={index} className="card">
              <div className="card-header" onClick={() => toggleAnswer(index)}>
                <h5 className="mb-0">
                  {item.question}
                  <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
                </h5>
              </div>
              <div className={`collapse ${activeIndex === index ? 'show' : ''}`}>
                <div className="card-body">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
