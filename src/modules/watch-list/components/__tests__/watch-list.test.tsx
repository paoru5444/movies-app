import { render, screen, fireEvent } from '@testing-library/react-native';
import WatchList from '../watch-list';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@/src/components', () => ({
  Header: ({ pageTitle }: { pageTitle: string }) => {
    const { Text } = require('react-native');
    return <Text>{pageTitle}</Text>;
  },
}));

jest.mock('../../../search/components/search-item', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return ({ item, goToDetail }: any) => (
    <TouchableOpacity
      onPress={() => goToDetail(item)}
      testID={`movie-item-${item.id}`}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('@/src/constants/images', () => ({
  images: { noMovieSaved: 0 },
}));

const mockMovies = [
  {
    adult: false,
    backdrop_path: '/8QBkWWXiOvNZdPbvzR8j0amw4Yy.jpg',
    genre_ids: [18, 10402],
    id: 1931,
    original_language: 'en',
    original_title: 'Stomp the Yard',
    overview:
      'After the death of his younger brother, a troubled 19-year-old street dancer from Los Angeles is able to bypass juvenile hall by enrolling in the historically black, Truth University in Atlanta, Georgia. But his efforts to get an education and woo the girl he likes are sidelined when he is courted by the top two campus fraternities, both of which want and need his fierce street-style dance moves to win the highly coveted national step show competition.',
    popularity: 2.8001,
    poster_path: '/dald9tUbRmGQ91CUJnzaBAjjvUf.jpg',
    release_date: '2007-05-16',
    title: 'Stomp the Yard',
    video: false,
    vote_average: 7.059,
    vote_count: 506,
  },
];

const goToDetailMock = jest.fn();

describe('WatchList', () => {
  it('render component correctly', () => {
    render(<WatchList movies={[]} goToDetail={goToDetailMock} />);
    expect(screen.getByText('Watch List')).toBeTruthy();
    expect(screen.getByText('There is no movie yet!')).toBeTruthy();
    expect(
      screen.getByText(
        'Find your movie by Type title,\ncategories, years, etc ',
      ),
    ).toBeTruthy();
  });

  it('should render a list of founded movies correctly', () => {
    render(<WatchList movies={mockMovies} goToDetail={goToDetailMock} />);
    expect(screen.getByText('Stomp the Yard')).toBeTruthy();
  });

  it('should call goToDetail on press a movie', () => {
    render(<WatchList movies={mockMovies} goToDetail={goToDetailMock} />);
    fireEvent.press(screen.getByTestId('movie-item-1931'));
    expect(goToDetailMock).toHaveBeenCalledTimes(1);
    expect(goToDetailMock).toHaveBeenCalledWith(mockMovies[0]);
  });
});
