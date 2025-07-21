import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  movie: any;
  onPress: () => void;
  onToggleFavorite: () => void;
};

const MovieCard: React.FC<Props> = ({ movie, onPress, onToggleFavorite }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.rating}>
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Text>

          <Text style={styles.date}>{movie.release_date}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteBtn} onPress={onToggleFavorite}>
        <FontAwesome
          name={movie.isFavorite ? 'heart' : 'heart-o'}
          size={24}
          color={movie.isFavorite ? 'red' : '#ccc'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 4,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 12,
    color: '#444',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
});
