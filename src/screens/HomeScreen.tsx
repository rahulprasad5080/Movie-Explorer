import React, { useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../services/api';
import { setMovies, setSearchQuery } from '../redux/movieSlice';
import { RootState } from '../redux/store';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { list, searchQuery } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    fetchMovies().then(movies => dispatch(setMovies(movies)));
  }, []);

  const filtered = list.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={text => dispatch(setSearchQuery(text))}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Details', { movie: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
});

export default HomeScreen;
