
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
  duration: string;
  genre: string;
}

const MovieCard = ({ id, title, posterUrl, rating, duration, genre }: MovieCardProps) => {
  return (
    <div className="movie-card rounded-lg overflow-hidden bg-cinema-secondary shadow-lg flex flex-col">
      <div className="relative">
        <img 
          src={posterUrl} 
          alt={`${title} poster`} 
          className="w-full h-[320px] object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-cinema-primary hover:bg-cinema-primary">{rating}</Badge>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span>{duration}</span>
          <span>{genre}</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="grid grid-cols-2 gap-2">
            <Link to={`/movies/${id}`}>
              <Button 
                variant="outline" 
                className="w-full text-sm border-gray-600 hover:border-white"
              >
                Details
              </Button>
            </Link>
            <Link to={`/seats/${id}`}>
              <Button 
                className="w-full text-sm bg-cinema-primary hover:bg-cinema-primary/90"
              >
                Book
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
