import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onPress: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: movie.poster }} style={styles.image} />
    <View>
      <Text style={styles.title}>{movie.title}</Text>
      <Text>
        ⭐ {movie.rating} | {movie.releaseYear}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieCard;
