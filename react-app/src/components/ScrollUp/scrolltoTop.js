import { useState, useEffect } from 'react';
import './scrollButton.css'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible && (
    <div className='scroll-up-container'>
    <button className='button-58' onClick={scrollToTop}>
      Scroll to top
    </button>
    </div>
  );
}

export default ScrollToTopButton;
