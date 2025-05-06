
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeaturedMovieProps {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  description: string;
  rating: string;
  duration: string;
  genre: string;
}

const FeaturedMovie = ({
  id,
  title,
  posterUrl,
  backdropUrl,
  description,
  rating,
  duration,
  genre
}: FeaturedMovieProps) => {
  return (
    <div className="relative w-full">
      {/* Backdrop */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/90 to-transparent"></div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Poster */}
            <div className="hidden md:block">
              <img 
                src={posterUrl} 
                alt={`${title} poster`} 
                className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto"
              />
            </div>
            
            {/* Details */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-cinema-primary hover:bg-cinema-primary">{rating}</Badge>
                <Badge variant="outline" className="border-gray-600">{duration}</Badge>
                <Badge variant="outline" className="border-gray-600">{genre}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
              
              <p className="text-gray-300 mb-6 max-w-2xl line-clamp-3 md:line-clamp-4">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to={`/seats/${id}`}>
                  <Button size="lg" className="bg-cinema-primary hover:bg-cinema-primary/90">
                    Book Tickets
                  </Button>
                </Link>
                <Link to={`/movies/${id}`}>
                  <Button variant="outline" size="lg" className="border-gray-600 hover:border-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
