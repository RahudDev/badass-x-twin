import { scrollToTop } from './config';

const HandlePageClick = (e, path, ref, navigate) => {
  e.preventDefault();

  // Scroll to top first
  scrollToTop();

  // Use setTimeout to delay animation start until scroll is complete
  setTimeout(() => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Navigate to the specified path after the scroll is initiated
    navigate(path);
  }, 300); // Adjust delay as needed
};

export default HandlePageClick;
