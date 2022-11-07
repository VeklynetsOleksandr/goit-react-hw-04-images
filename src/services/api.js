import axios from 'axios';

const API_KEY = '29832813-50bebe44f13572e25ed67f5b6';
const BASE_FILTER = 'image_type=photo&orientation=horizontal&per_page=12';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `?q=${searchQuery}&page=${page}&key=${API_KEY}&${BASE_FILTER}`
    );
    return response.data;
  } catch (error) {}
};
