
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Film } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const nowShowingMovies = [
  {
    id: "1",
    title: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: "PG-13",
    duration: "2h 46m",
    genre: "Science Fiction"
  },
  {
    id: "2",
    title: "Godzilla x Kong: The New Empire",
    posterUrl: "https://image.tmdb.org/t/p/w500/nXXJRFJL0TSRQJmCUFbvydqSuXv.jpg",
    rating: "PG-13",
    duration: "1h 55m",
    genre: "Action"
  },
  {
    id: "3",
    title: "Kung Fu Panda 4",
    posterUrl: "https://image.tmdb.org/t/p/w500/wOVbQd9E95jP6Ph7MguwvHLrpkP.jpg",
    rating: "PG",
    duration: "1h 34m",
    genre: "Animation"
  },
  {
    id: "4",
    title: "Ghostbusters: Frozen Empire",
    posterUrl: "https://image.tmdb.org/t/p/w500/37VkomzXkzdWJe5Vd1hG5tqLeMu.jpg",
    rating: "PG-13",
    duration: "1h 55m",
    genre: "Fantasy"
  },
  {
    id: "9",
    title: "Civil War",
    posterUrl: "https://image.tmdb.org/t/p/w500/wVKCKNhMKEyoQs2UXtXFa7GCB7J.jpg", 
    rating: "R",
    duration: "1h 48m",
    genre: "Action"
  },
  {
    id: "10",
    title: "The Fall Guy",
    posterUrl: "https://image.tmdb.org/t/p/w500/bkpPTZUdq31UGDovmRnryWAUcZJ.jpg",
    rating: "PG-13",
    duration: "2h 6m",
    genre: "Action"
  },
  {
    id: "11",
    title: "Monkey Man",
    posterUrl: "https://image.tmdb.org/t/p/w500/jGYZhDJGMYfu1YUl0YjXzSXQche.jpg", 
    rating: "R",
    duration: "1h 53m",
    genre: "Action"
  },
  {
    id: "12",
    title: "The Ministry of Ungentlemanly Warfare",
    posterUrl: "https://image.tmdb.org/t/p/w500/h3jYanWMEJq6JJsCopy1h7cT2Hs.jpg", 
    rating: "R",
    duration: "2h 0m",
    genre: "War"
  }
];

const comingSoonMovies = [
  {
    id: "5",
    title: "The Garfield Movie",
    posterUrl: "https://image.tmdb.org/t/p/w500/eoI8JnpahwFb5LiCHGbXS9v6b9R.jpg",
    rating: "PG",
    duration: "1h 41m",
    genre: "Animation"
  },
  {
    id: "6",
    title: "Kingdom of the Planet of the Apes",
    posterUrl: "https://image.tmdb.org/t/p/w500/onnJ1Wrvf8gr5nEXhNjj1jxESTr.jpg",
    rating: "PG-13",
    duration: "2h 25m",
    genre: "Science Fiction"
  },
  {
    id: "7",
    title: "IF",
    posterUrl: "https://image.tmdb.org/t/p/w500/2g1HXvUhNjXQ6ez9gp3xA3BKiDB.jpg",
    rating: "PG",
    duration: "1h 44m",
    genre: "Family"
  },
  {
    id: "8",
    title: "Furiosa: A Mad Max Saga",
    posterUrl: "https://image.tmdb.org/t/p/w500/5Uwepeifdv3AZMK1Am2WDbFUta.jpg",
    rating: "R",
    duration: "2h 28m",
    genre: "Action"
  },
  {
    id: "13",
    title: "Bad Boys: Ride or Die",
    posterUrl: "https://image.tmdb.org/t/p/w500/dCFfkQIL7GwZYtI0BKuujQfTRjQ.jpg",
    rating: "R",
    duration: "1h 55m",
    genre: "Action"
  },
  {
    id: "14",
    title: "Inside Out 2",
    posterUrl: "https://image.tmdb.org/t/p/w500/aqy6ntdaYI71aGKFQHKAZSFmu8Z.jpg",
    rating: "PG",
    duration: "1h 56m",
    genre: "Animation"
  },
  {
    id: "15",
    title: "A Quiet Place: Day One",
    posterUrl: "https://image.tmdb.org/t/p/w500/7xT0V9lyVLpuoGw2VzT2jKkJUAp.jpg",
    rating: "PG-13",
    duration: "1h 39m",
    genre: "Horror"
  },
  {
    id: "16",
    title: "Despicable Me 4",
    posterUrl: "https://image.tmdb.org/t/p/w500/xZzrTbN8xn99YLGyjI2jCZQzcih.jpg",
    rating: "PG",
    duration: "1h 35m",
    genre: "Animation"
  }
];

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('nowShowing');
  
  const allGenres = [...new Set([
    ...nowShowingMovies.map(movie => movie.genre),
    ...comingSoonMovies.map(movie => movie.genre),
  ])].sort();
  
  const allRatings = [...new Set([
    ...nowShowingMovies.map(movie => movie.rating),
    ...comingSoonMovies.map(movie => movie.rating),
  ])].sort();

  const filterMovies = (movies: typeof nowShowingMovies) => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter === 'all' || movie.genre === genreFilter;
      const matchesRating = ratingFilter === 'all' || movie.rating === ratingFilter;
      
      return matchesSearch && matchesGenre && matchesRating;
    });
  };

  const filteredNowShowing = filterMovies(nowShowingMovies);
  const filteredComingSoon = filterMovies(comingSoonMovies);

  const resetFilters = () => {
    setSearchTerm('');
    setGenreFilter('all');
    setRatingFilter('all');
  };

  const activeMovies = activeTab === 'nowShowing' ? filteredNowShowing : filteredComingSoon;
  const hasActiveFilters = searchTerm || genreFilter !== 'all' || ratingFilter !== 'all';

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Movies</h1>
            <p className="text-gray-400">Browse our collection of movies currently showing and coming soon.</p>
          </div>

          <div className="mb-8">
            <Tabs 
              defaultValue="nowShowing" 
              className="w-full"
              onValueChange={(value) => {
                setActiveTab(value);
                // Reset filters when changing tabs
                resetFilters();
              }}
            >
              <TabsList className="bg-cinema-secondary mb-6">
                <TabsTrigger value="nowShowing" className="data-[state=active]:bg-cinema-primary flex items-center">
                  <Film className="mr-2 h-4 w-4" />
                  Now Showing
                </TabsTrigger>
                <TabsTrigger value="comingSoon" className="data-[state=active]:bg-cinema-primary flex items-center">
                  <Film className="mr-2 h-4 w-4" />
                  Coming Soon
                </TabsTrigger>
              </TabsList>
              
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <Input
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-cinema-secondary border-gray-700"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-1/2">
                  <Select value={genreFilter} onValueChange={setGenreFilter}>
                    <SelectTrigger className="bg-cinema-secondary border-gray-700">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-cinema-secondary border-gray-700">
                      <SelectGroup>
                        <SelectLabel>Genre</SelectLabel>
                        <SelectItem value="all">All Genres</SelectItem>
                        {allGenres.map(genre => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="bg-cinema-secondary border-gray-700">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-cinema-secondary border-gray-700">
                      <SelectGroup>
                        <SelectLabel>Rating</SelectLabel>
                        <SelectItem value="all">All Ratings</SelectItem>
                        {allRatings.map(rating => (
                          <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Active filters display */}
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  
                  {searchTerm && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300 flex items-center gap-1">
                      Search: {searchTerm}
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="ml-1 hover:text-cinema-primary"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  
                  {genreFilter !== 'all' && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300 flex items-center gap-1">
                      Genre: {genreFilter}
                      <button 
                        onClick={() => setGenreFilter('all')}
                        className="ml-1 hover:text-cinema-primary"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  
                  {ratingFilter !== 'all' && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300 flex items-center gap-1">
                      Rating: {ratingFilter}
                      <button 
                        onClick={() => setRatingFilter('all')}
                        className="ml-1 hover:text-cinema-primary"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-cinema-primary hover:underline ml-2"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <TabsContent value="nowShowing" className="mt-0">
                {filteredNowShowing.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredNowShowing.map((movie) => (
                      <MovieCard key={movie.id} {...movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Film className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                    <p className="text-gray-400">
                      Try adjusting your filters or search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="comingSoon" className="mt-0">
                {filteredComingSoon.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredComingSoon.map((movie) => (
                      <MovieCard key={movie.id} {...movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Film className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                    <p className="text-gray-400">
                      Try adjusting your filters or search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Movies;
