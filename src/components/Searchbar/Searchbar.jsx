import { AiOutlineSearch } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import {
  SearchbarStyle,
  SearchFormStyle,
  SearchFormButtonStyle,
  SearchFormButtonLabelStyle,
  SearchFormInputStyle,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

    return (
    <SearchbarStyle>
      <SearchFormStyle onSubmit={handleSubmit}>
        <SearchFormButtonStyle type="submit">
          <SearchFormButtonLabelStyle>Search</SearchFormButtonLabelStyle>
          <AiOutlineSearch size="24px" />
        </SearchFormButtonStyle>

        <SearchFormInputStyle
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)          }
        />
      </SearchFormStyle>
    </SearchbarStyle>
  );
};

Searchbar.propTypes = {
  onChange: PropTypes.func,
};
