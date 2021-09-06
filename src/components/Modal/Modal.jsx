import { useEffect } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ onClose, alt, src }) => {
  useEffect(() => {
    // console.log("didMount");
    window.addEventListener('keydown', handleKeyDown);

    // console.log('Unmount');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  //закрытие модалки по ескейпу
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  //закрытие модалки по клику в бэкдроп
  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackDropClick}>
      <div className={styles.modal}>
        {/* {children} */}
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;

///////////////////////////////////////////////////CLASS///////////////////////////////////////

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// // import PropTypes from 'prop-types';

// import styles from './Modal.module.css';

// const modalRoot = document.querySelector('#modal-root');
// class Modal extends Component {
//   componentDidMount() {
//     // console.log("didMount");
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     // console.log('Unmount');
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   //закрытие модалки по ескейпу
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   //закрытие модалки по клику в бэкдроп
//   handleBackDropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.overlay} onClick={this.handleBackDropClick}>
//         <div className={styles.modal}>
//           {/* {this.props.children} */}
//           <img src={this.props.src} alt={this.props.alt} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// export default Modal;
