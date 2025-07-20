import { Movie } from '../types/movie';

export const fetchMovies = async (): Promise<Movie[]> => {
  // Static mock data; replace with Axios call for real API
  return [
    {
      id: 1,
      title: 'Inception',
      rating: 8.8,
      releaseYear: '2010',
      description: 'A mind-bending thriller by Christopher Nolan.',
      poster: 'https://via.placeholder.com/150',
      genres: ['Action', 'Sci-Fi'],
      releaseDate: '2010-07-16',
    },
    {
      id: 2,
      title: 'Interstellar',
      rating: 8.6,
      releaseYear: '2014',
      description: 'A space odyssey that explores time and gravity.',
      poster: 'https://via.placeholder.com/150',
      genres: ['Adventure', 'Drama'],
      releaseDate: '2014-11-07',
    },
  ];
};
