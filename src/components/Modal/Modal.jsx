import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import { OverlayStyle, ModalContainerStyle } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ tags, largeImageURL, onClose }) => {

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropKlick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    return createPortal(
    <OverlayStyle onClick={handleBackdropKlick}>
      <ModalContainerStyle>
        <img src={largeImageURL} alt={tags} width="1100px" />
      </ModalContainerStyle>
    </OverlayStyle>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};