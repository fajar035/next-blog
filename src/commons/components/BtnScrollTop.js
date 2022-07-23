import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, [visible]);

  return (
    <button
      className={visible ? 'shown-top' : 'hide-top'}
      type="button"
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faArrowUp} width={20} heigth={20} />
    </button>
    // <Button>
    //   <FaArrowCircleUp
    //     onClick={scrollToTop}
    //     style={{ display: visible ? 'inline' : 'none' }}
    //   />
    // </Button>
  );
}

// export default ScrollButton;
