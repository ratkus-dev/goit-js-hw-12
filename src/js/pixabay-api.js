import axios from 'axios';

const API_KEY = '4051184-f948224db98cb53fbca29b919';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: PER_PAGE,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при получении изображений:', error);
    throw error;
  }
}
