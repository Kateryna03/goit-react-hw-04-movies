//import React, { Component } from 'react';
import { useState } from 'react';
import Modal from '../Modal';
import styles from './ImageGalleryItem.module.css';

const GalleryItem = ({ id, src, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };

  return (
    <li key={id} className={styles.imageGalleryItem}>
      <img
        onClick={toggleModal}
        src={src}
        alt={alt}
        className={styles.imageGalleryItemImage}
      />
      {showModal && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={alt} />
      )}
    </li>
  );
};

export default GalleryItem;
