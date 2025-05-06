
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedMovie from '@/components/FeaturedMovie';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';

// Sample data - in a real app, this would come from an API
const featuredMovie = {
  id: "1",
  title: "Dune: Part Two",
  posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  backdropUrl: "https://image.tmdb.org/t/p/original/aCJnMqCkB26VHpoqQxRt8Zb7y18.jpg",
  description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  rating: "PG-13",
  duration: "2h 46m",
  genre: "Science Fiction"
};

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
  }
];

const comingSoonMovies = [
  {
    id: "5",
    title: "The Fall Guy",
    posterUrl: "https://image.tmdb.org/t/p/w500/bkpPTZUdq31UGDovmRnryWAUcZJ.jpg", 
    rating: "PG-13",
    duration: "2h 6m",
    genre: "Action"
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
  }
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("nowShowing");
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow">
        {/* Featured Movie */}
        {loading ? (
          <div className="w-full h-[70vh] relative">
            <Skeleton className="w-full h-full absolute" />
          </div>
        ) : (
          <FeaturedMovie {...featuredMovie} />
        )}

        {/* Movie Listings */}
        <div className="container mx-auto px-4 py-12">
          <Tabs 
            defaultValue="nowShowing" 
            className="w-full"
            onValueChange={(value) => setCurrentTab(value)}
          >
            <div className="flex items-center justify-between mb-8">
              <TabsList className="bg-cinema-secondary">
                <TabsTrigger value="nowShowing" className="data-[state=active]:bg-cinema-primary">Now Showing</TabsTrigger>
                <TabsTrigger value="comingSoon" className="data-[state=active]:bg-cinema-primary">Coming Soon</TabsTrigger>
              </TabsList>
              
              <Link to="/movies">
                <Button variant="link" className="text-cinema-gold">
                  View All Movies
                </Button>
              </Link>
            </div>
            
            <TabsContent value="nowShowing" className="mt-0">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-[320px] w-full rounded-lg" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {nowShowingMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="comingSoon" className="mt-0">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-[320px] w-full rounded-lg" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {comingSoonMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Promotions Section */}
        <section className="bg-cinema-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Enhance your movie experience with our special deals and promotions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-cinema-dark to-cinema-secondary rounded-lg p-6 border border-gray-800 text-center">
                <div className="mb-4 text-cinema-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto">
                    <path d="M6 8v8"></path>
                    <path d="M18 8v8"></path>
                    <path d="M3 8l18-4v16L3 16V8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Family Tuesday</h3>
                <p className="text-gray-400 mb-4">
                  Every Tuesday, enjoy special pricing for the whole family with our family package.
                </p>
                <Button variant="outline" className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-dark">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-cinema-dark to-cinema-secondary rounded-lg p-6 border border-gray-800 text-center">
                <div className="mb-4 text-cinema-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto">
                    <path d="M16 3h3a2 2 0 0 1 2 2v14"></path>
                    <path d="M1 17a2 2 0 0 0 2 2h9.5"></path>
                    <path d="M8 12h13"></path>
                    <path d="M8 5v14"></path>
                    <path d="M13 5v14"></path>
                    <path d="M21 8v9"></path>
                    <path d="M3 8v9"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">VIP Experience</h3>
                <p className="text-gray-400 mb-4">
                  Premium seating, exclusive snacks, and priority service with our VIP package.
                </p>
                <Button variant="outline" className="border-cinema-primary text-cinema-primary hover:bg-cinema-primary hover:text-white">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-cinema-dark to-cinema-secondary rounded-lg p-6 border border-gray-800 text-center">
                <div className="mb-4 text-cinema-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto">
                    <path d="M5 7.2C5 4.33 7.33 2 10.2 2c2.26 0 4.2 1.42 4.96 3.42"></path>
                    <path d="M9 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h6"></path>
                    <circle cx="9" cy="13" r="2"></circle>
                    <path d="M11.2 22c2.87 0 5.2-2.33 5.2-5.2 0-2.26-1.42-4.2-3.42-4.96"></path>
                    <path d="M15 2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-6"></path>
                    <circle cx="15" cy="11" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Student Discount</h3>
                <p className="text-gray-400 mb-4">
                  Students get special discounts every day. Just show your valid student ID.
                </p>
                <Button variant="outline" className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-dark">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Cinema Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Ultimate Cinema Experience</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                At CineMagic, we're dedicated to providing the most immersive and comfortable movie experience possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 bg-cinema-secondary p-4 rounded-full inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cinema-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <rect width="8" height="6" x="8" y="14" rx="1"></rect>
                    <path d="m2 8 20-2"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Screens</h3>
                <p className="text-gray-400">
                  State-of-the-art projection technology for the sharpest image quality.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 bg-cinema-secondary p-4 rounded-full inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cinema-gold">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"></path>
                    <path d="M22 10H2"></path>
                    <path d="M7 6v12"></path>
                    <path d="M17 6v12"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Luxury Seating</h3>
                <p className="text-gray-400">
                  Reclining leather seats with ample legroom and personal space.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 bg-cinema-secondary p-4 rounded-full inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cinema-primary">
                    <path d="M3 11h18"></path>
                    <path d="M12 5v6"></path>
                    <path d="M12 13v6"></path>
                    <circle cx="12" cy="11" r="8"></circle>
                    <circle cx="12" cy="11" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Dolby Atmos</h3>
                <p className="text-gray-400">
                  Immersive surround sound that places audio anywhere in the theater.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 bg-cinema-secondary p-4 rounded-full inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cinema-gold">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Gourmet Concessions</h3>
                <p className="text-gray-400">
                  Premium food and beverages that go beyond traditional movie snacks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
