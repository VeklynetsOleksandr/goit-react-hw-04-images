import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal } from '../Modal/Modal';

import {
  ImageGalleryItemStyle,
  GalleryItemImageStyle,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(isModalOpen => setIsModalOpen(!isModalOpen));
  };

    return (
    <>
      <ImageGalleryItemStyle onClick={toggleModal}>
        <GalleryItemImageStyle src={webformatURL} alt={tags} key={id} />
      </ImageGalleryItemStyle>
      {isModalOpen && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
    id: PropTypes.number, 
    webformatURL: PropTypes.string.isRequired, 
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };
