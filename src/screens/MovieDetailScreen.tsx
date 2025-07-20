import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { RootState } from '../redux/store';
import { Movie } from '../types/movie';

const MovieDetailScreen = ({ route }: any) => {
  const { movie } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFav = favorites.some(m => m.id === movie.id);

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text>{movie.description}</Text>
      <Text>Genres: {movie.genres.join(', ')}</Text>
      <Text>Release Date: {movie.releaseDate}</Text>
      <Button
        title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={() => dispatch(toggleFavorite(movie))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieDetailScreen;
