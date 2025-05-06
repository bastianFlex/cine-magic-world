
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Film, Star } from 'lucide-react';

// Sample theater data - in a real app, this would come from an API
const theaters = [
  {
    id: "1",
    name: "CineMagic Downtown",
    address: "123 Main Street, Downtown, City",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["IMAX", "Dolby Atmos", "VIP Seating", "Dine-in Service"],
    rating: 4.8,
    movies: [
      {
        id: "1",
        title: "Dune: Part Two",
        showtimes: ["10:30 AM", "1:45 PM", "5:15 PM", "8:45 PM"]
      },
      {
        id: "2",
        title: "Godzilla x Kong: The New Empire",
        showtimes: ["11:15 AM", "2:30 PM", "6:00 PM", "9:15 PM"]
      },
      {
        id: "3",
        title: "Kung Fu Panda 4",
        showtimes: ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM", "8:00 PM"]
      }
    ]
  },
  {
    id: "2",
    name: "CineMagic Westside",
    address: "456 Oak Boulevard, Westside, City",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["4DX", "ScreenX", "Premium Loungers", "Bar"],
    rating: 4.6,
    movies: [
      {
        id: "1",
        title: "Dune: Part Two",
        showtimes: ["11:00 AM", "2:15 PM", "5:45 PM", "9:15 PM"]
      },
      {
        id: "4",
        title: "Ghostbusters: Frozen Empire",
        showtimes: ["10:15 AM", "1:30 PM", "4:45 PM", "8:00 PM"]
      },
      {
        id: "9",
        title: "Civil War",
        showtimes: ["12:00 PM", "3:15 PM", "6:30 PM", "9:45 PM"]
      }
    ]
  },
  {
    id: "3",
    name: "CineMagic Eastside",
    address: "789 Pine Street, Eastside, City",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["RealD 3D", "Luxury Recliners", "Full Bar", "Arcade"],
    rating: 4.5,
    movies: [
      {
        id: "2",
        title: "Godzilla x Kong: The New Empire",
        showtimes: ["10:45 AM", "1:30 PM", "4:15 PM", "7:00 PM", "9:45 PM"]
      },
      {
        id: "3",
        title: "Kung Fu Panda 4",
        showtimes: ["11:30 AM", "2:00 PM", "4:30 PM", "7:15 PM"]
      },
      {
        id: "4",
        title: "Ghostbusters: Frozen Empire",
        showtimes: ["12:15 PM", "3:30 PM", "6:45 PM", "9:30 PM"]
      }
    ]
  }
];

const Theaters = () => {
  const [activeTheaterId, setActiveTheaterId] = useState(theaters[0].id);
  
  const activeTheater = theaters.find(theater => theater.id === activeTheaterId) || theaters[0];

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Our Theaters</h1>
            <p className="text-gray-400">Choose a theater to view showtimes and book your tickets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Theater list */}
            <div className="md:col-span-1 space-y-4">
              {theaters.map((theater) => (
                <Card 
                  key={theater.id}
                  className={`bg-cinema-secondary border cursor-pointer transition-all hover:border-cinema-primary ${theater.id === activeTheaterId ? 'border-cinema-primary' : 'border-gray-800'}`}
                  onClick={() => setActiveTheaterId(theater.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {theater.name}
                      <div className="flex items-center text-cinema-gold">
                        <Star className="h-4 w-4 fill-cinema-gold mr-1" />
                        <span className="text-sm">{theater.rating}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="flex items-center text-gray-400">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {theater.address}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-1">
                    <div className="flex flex-wrap gap-2">
                      {theater.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-700">
                          {feature}
                        </Badge>
                      ))}
                      {theater.features.length > 2 && (
                        <Badge variant="outline" className="text-xs border-gray-700">
                          +{theater.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Theater details */}
            <div className="md:col-span-2">
              <Card className="bg-cinema-secondary border-gray-800">
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img 
                    src={activeTheater.image} 
                    alt={activeTheater.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-2xl font-bold">{activeTheater.name}</h2>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{activeTheater.address}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeTheater.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="border-gray-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Film className="mr-2 h-5 w-5" />
                      Now Playing
                    </h3>
                    
                    <Tabs defaultValue={activeTheater.movies[0].id} className="w-full">
                      <TabsList className="bg-cinema-dark w-full h-auto flex flex-wrap justify-start mb-4">
                        {activeTheater.movies.map((movie) => (
                          <TabsTrigger 
                            key={movie.id}
                            value={movie.id}
                            className="data-[state=active]:bg-cinema-primary whitespace-nowrap text-sm py-2"
                          >
                            {movie.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {activeTheater.movies.map((movie) => (
                        <TabsContent key={movie.id} value={movie.id} className="mt-0">
                          <div className="bg-cinema-dark/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold">{movie.title}</h4>
                              <Link to={`/movies/${movie.id}`}>
                                <Button variant="link" className="text-cinema-gold p-0 h-auto" size="sm">
                                  Movie details
                                </Button>
                              </Link>
                            </div>
                            
                            <div className="flex items-center text-gray-400 mb-4">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>Today</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {movie.showtimes.map((time, index) => (
                                <Link key={index} to={`/seats/${movie.id}`}>
                                  <Button variant="outline" className="border-gray-700 hover:border-cinema-primary hover:bg-cinema-primary/10">
                                    {time}
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button className="bg-cinema-gold text-cinema-dark hover:bg-cinema-gold/90">
                      See All Movies at this Theater
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Theaters;
