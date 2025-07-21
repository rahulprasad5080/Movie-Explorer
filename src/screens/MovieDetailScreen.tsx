import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { RootState } from '../redux/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { mapGenres } from '../types/movie';
import { useNavigation } from '@react-navigation/native';

const MovieDetailScreen = ({ route }: any) => {
  const { movie } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFav = favorites.some(m => m.id === movie.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={handleToggleFavorite}
          >
            <MaterialIcons
              name={isFav ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFav ? 'red' : '#333'}
            />
            <Text style={[styles.favoriteText, isFav && { color: 'red' }]}>
              {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>
            {movie.overview || 'No description available.'}
          </Text>

          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genreContainer}>
            {mapGenres(movie.genre_ids).map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Release Date</Text>
          <Text style={styles.releaseDate}>{movie.release_date}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
    marginTop: 20,
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#000',
  },
  poster: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  favoriteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  favoriteText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#444',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  genreTag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 14,
    color: '#444',
  },
  releaseDate: {
    fontSize: 15,
    color: '#444',
  },
});
