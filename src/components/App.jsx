import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from '../services/api';
import { ContainerStyle } from './App.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    loadImages(searchQuery, page);
  }, [searchQuery, page]);

  const loadImages = async (searchQuery, page) => {
    try {
      setIsLoading(true);
      setShowButton(false);
            
      const responseData = await fetchImages(searchQuery, page);

      const newImages = responseData.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          const image = { id, webformatURL, largeImageURL, tags };
          return image;
        }
      );

      if (newImages.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      const numberOfPages = Math.ceil(responseData.total / 12);

      numberOfPages > page ? setShowButton(true) : setShowButton(false);

      setImages(images => [...images, ...newImages]);
    } catch (error) {
      Notify.failure('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = searchQuery => {
    if (searchQuery.trim().length === 0) {
      Notify.warning('Please enter a word for search');
      return;
    }

    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <ContainerStyle>
      <Searchbar onSubmit={onFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      <Loader loading={isLoading} />
      {showButton && <Button onClick={loadMore}>Load more</Button>}
    </ContainerStyle>
  );
};
