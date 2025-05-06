
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, Film, Ticket, Star } from 'lucide-react';

// Sample movie data - in a real app, this would come from an API
const movieData = [
  {
    id: "1",
    title: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/aCJnMqCkB26VHpoqQxRt8Zb7y18.jpg",
    description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    rating: "PG-13",
    duration: "2h 46m",
    genre: "Science Fiction",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem", "Josh Brolin", "Austin Butler"],
    releaseDate: "March 1, 2024",
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    userRating: 8.6,
    showtimes: [
      { time: "10:30 AM", auditorium: "IMAX", date: "Today" },
      { time: "1:45 PM", auditorium: "IMAX", date: "Today" },
      { time: "5:15 PM", auditorium: "IMAX", date: "Today" },
      { time: "8:45 PM", auditorium: "IMAX", date: "Today" },
      { time: "11:15 AM", auditorium: "Standard", date: "Today" },
      { time: "2:30 PM", auditorium: "Standard", date: "Today" },
      { time: "6:00 PM", auditorium: "Standard", date: "Today" },
      { time: "9:15 PM", auditorium: "Standard", date: "Today" },
      { time: "10:00 AM", auditorium: "IMAX", date: "Tomorrow" },
      { time: "1:15 PM", auditorium: "IMAX", date: "Tomorrow" },
      { time: "4:45 PM", auditorium: "IMAX", date: "Tomorrow" },
      { time: "8:30 PM", auditorium: "IMAX", date: "Tomorrow" },
      { time: "10:45 AM", auditorium: "Standard", date: "Tomorrow" },
      { time: "3:00 PM", auditorium: "Standard", date: "Tomorrow" },
      { time: "6:30 PM", auditorium: "Standard", date: "Tomorrow" },
      { time: "9:45 PM", auditorium: "Standard", date: "Tomorrow" }
    ]
  },
  // More movies would go here
];

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<typeof movieData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState("Today");
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundMovie = movieData.find(m => m.id === id);
      setMovie(foundMovie || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen gradient-bg">
        <Navbar />
        
        <main className="flex-grow">
          <div className="relative w-full h-[60vh]">
            <Skeleton className="w-full h-full absolute" />
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <Skeleton className="h-24 w-full mb-8" />
                <Skeleton className="h-8 w-1/3 mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-1/4 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-[450px] w-full mb-4" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="flex flex-col min-h-screen gradient-bg">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-12">
            <Film className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
            <p className="text-gray-400 mb-6">The movie you're looking for doesn't exist or has been removed.</p>
            <Link to="/movies">
              <Button className="bg-cinema-primary hover:bg-cinema-primary/90">
                Browse Movies
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  const filteredShowtimes = movie.showtimes.filter(showtime => showtime.date === activeDay);

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero backdrop */}
        <div className="relative w-full h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/90 to-transparent"></div>
        </div>
        
        {/* Movie details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column (details) */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-cinema-primary">{movie.rating}</Badge>
                <Badge variant="outline" className="border-gray-700 flex items-center gap-2">
                  <Clock className="h-3 w-3" /> {movie.duration}
                </Badge>
                <Badge variant="outline" className="border-gray-700">{movie.genre}</Badge>
                <div className="flex items-center text-cinema-gold ml-auto">
                  <Star className="fill-cinema-gold stroke-cinema-gold h-4 w-4 mr-1" />
                  <span className="font-bold">{movie.userRating}/10</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex items-center text-gray-400 mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Release Date: {movie.releaseDate}</span>
              </div>
              
              <p className="text-gray-300 mb-8">
                {movie.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-gray-400">{movie.director}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <Badge key={index} variant="outline" className="border-gray-700">
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Showtimes</h2>
                  
                  <TabsList className="bg-cinema-secondary">
                    <TabsTrigger 
                      value="Today" 
                      onClick={() => setActiveDay("Today")}
                      className={activeDay === "Today" ? "bg-cinema-primary" : ""}
                    >
                      Today
                    </TabsTrigger>
                    <TabsTrigger 
                      value="Tomorrow" 
                      onClick={() => setActiveDay("Tomorrow")}
                      className={activeDay === "Tomorrow" ? "bg-cinema-primary" : ""}
                    >
                      Tomorrow
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {filteredShowtimes.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredShowtimes.map((showtime, index) => (
                      <Link key={index} to={`/seats/${movie.id}`}>
                        <Card className="bg-cinema-secondary border-gray-700 hover:border-cinema-primary transition-colors overflow-hidden">
                          <CardContent className="p-0">
                            <div className="bg-cinema-dark p-2 text-xs font-medium text-center border-b border-gray-700">
                              {showtime.auditorium}
                            </div>
                            <div className="p-4 text-center">
                              <div className="text-lg font-semibold mb-1">{showtime.time}</div>
                              <div className="text-xs text-gray-400">{showtime.date}</div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-cinema-secondary/30 rounded-lg">
                    <p className="text-gray-400">No showtimes available for this day.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column (poster and trailer) */}
            <div>
              <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                <img 
                  src={movie.posterUrl} 
                  alt={`${movie.title} poster`} 
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <Button className="w-full bg-cinema-primary hover:bg-cinema-primary/90 flex items-center justify-center gap-2">
                  <Ticket className="h-4 w-4" />
                  Book Tickets
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Trailer</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={movie.trailerUrl}
                    title={`${movie.title} trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetails;
