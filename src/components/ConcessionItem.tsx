
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface ConcessionItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isCombo?: boolean;
}

const ConcessionItem = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  isCombo = false
}: ConcessionItemProps) => {
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-cinema-secondary rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        {isCombo && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-cinema-gold hover:bg-cinema-gold text-cinema-dark">Combo</Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-cinema-gold font-medium">${price.toFixed(2)}</span>
        </div>
        
        <Badge variant="outline" className="w-fit border-gray-600 mb-2">
          {category}
        </Badge>
        
        <p className="text-sm text-gray-400 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-gray-600" 
              onClick={decreaseQuantity}
              disabled={quantity === 0}
            >
              -
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-gray-600" 
              onClick={increaseQuantity}
            >
              +
            </Button>
          </div>
          
          <Button 
            className="bg-cinema-primary hover:bg-cinema-primary/90"
            size="sm"
            disabled={quantity === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConcessionItem;
