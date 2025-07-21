import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import CustomSearchBar from '../components/SearchBar';
import {
  setError,
  setLoading,
  setMovies,
  setSearchQuery,
} from '../redux/movieSlice';
import { RootState } from '../redux/store';
import { fetchMovies } from '../services/api';
import { toggleFavorite } from '../redux/favoritesSlice';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { list, searchQuery } = useSelector((state: RootState) => state.movies);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      if (page === 1) dispatch(setLoading(true));
      else setLoadingMore(true);

      try {
        const movies = await fetchMovies(page);
        dispatch(setMovies(page === 1 ? movies : [...list, ...movies]));
      } catch (error) {
        dispatch(setError('Failed to fetch movies'));
      } finally {
        dispatch(setLoading(false));
        setLoadingMore(false);
      }
    };

    loadMovies();
  }, [page, dispatch]);

  const filtered = [...list]
    .map(movie => ({
      ...movie,
      isFavorite: favorites.some(f => f.id === movie.id),
    }))
    .filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

  const loadMore = () => {
    if (!loadingMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.contentWrapper}>
        <CustomSearchBar
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
              onToggleFavorite={() => dispatch(toggleFavorite(item))}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 5 }}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: 180,
            offset: 180 * index,
            index,
          })}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" color="#000" />
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
