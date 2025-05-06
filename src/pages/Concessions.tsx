
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConcessionItem from '@/components/ConcessionItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const concessions = {
  combos: [
    {
      id: "combo1",
      name: "Movie Lover Combo",
      description: "Large popcorn, 2 large drinks and a candy of your choice.",
      price: 19.99,
      imageUrl: "https://images.unsplash.com/photo-1627224093720-7b127338eee9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Combo",
      isCombo: true
    },
    {
      id: "combo2",
      name: "Date Night Combo",
      description: "Medium popcorn, 2 medium drinks and a box of chocolate.",
      price: 17.99,
      imageUrl: "https://images.unsplash.com/photo-1485995010096-5544016e9f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Combo",
      isCombo: true
    },
    {
      id: "combo3",
      name: "Family Pack",
      description: "Large popcorn, 4 medium drinks and 2 candies.",
      price: 29.99,
      imageUrl: "https://images.unsplash.com/photo-1515283709260-ee29296f1534?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Combo",
      isCombo: true
    },
    {
      id: "combo4",
      name: "Kids Pack",
      description: "Small popcorn, small drink, fruit snacks, and a toy.",
      price: 12.99,
      imageUrl: "https://images.unsplash.com/photo-1517686350973-176e31fb23b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Combo",
      isCombo: true
    }
  ],
  popcorn: [
    {
      id: "pop1",
      name: "Small Popcorn",
      description: "Freshly popped corn with butter.",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Popcorn"
    },
    {
      id: "pop2",
      name: "Medium Popcorn",
      description: "Freshly popped corn with butter.",
      price: 7.99,
      imageUrl: "https://images.unsplash.com/photo-1572489493550-5dd0c4418ffe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Popcorn"
    },
    {
      id: "pop3",
      name: "Large Popcorn",
      description: "Freshly popped corn with butter.",
      price: 9.99,
      imageUrl: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Popcorn"
    },
    {
      id: "pop4",
      name: "Caramel Popcorn",
      description: "Sweet caramel-coated popcorn.",
      price: 8.99,
      imageUrl: "https://images.unsplash.com/photo-1633933358116-a27b902fad35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Popcorn"
    }
  ],
  drinks: [
    {
      id: "drink1",
      name: "Small Soda",
      description: "Your choice of soft drink.",
      price: 4.99,
      imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Drink"
    },
    {
      id: "drink2",
      name: "Medium Soda",
      description: "Your choice of soft drink.",
      price: 5.99,
      imageUrl: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Drink"
    },
    {
      id: "drink3",
      name: "Large Soda",
      description: "Your choice of soft drink.",
      price: 6.99,
      imageUrl: "https://images.unsplash.com/photo-1578020190125-d0e9a4a6dfde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Drink"
    },
    {
      id: "drink4",
      name: "Bottled Water",
      description: "500ml bottled water.",
      price: 3.99,
      imageUrl: "https://images.unsplash.com/photo-1606168094336-48f943e4116c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Drink"
    }
  ],
  snacks: [
    {
      id: "snack1",
      name: "Chocolate Bar",
      description: "Selection of popular chocolate bars.",
      price: 3.99,
      imageUrl: "https://images.unsplash.com/photo-1623903088432-d8f44cc8e314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Candy"
    },
    {
      id: "snack2",
      name: "Gummy Bears",
      description: "Sweet and chewy gummy bears.",
      price: 4.99,
      imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Candy"
    },
    {
      id: "snack3",
      name: "Nachos",
      description: "Crunchy nachos with cheese sauce.",
      price: 7.99,
      imageUrl: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Snack"
    },
    {
      id: "snack4",
      name: "Hot Dog",
      description: "All-beef hot dog with condiments.",
      price: 6.99,
      imageUrl: "https://images.unsplash.com/photo-1558122104-355edad709f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Snack"
    }
  ]
};

const Concessions = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAddToCart = (itemId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity
    }));
    
    toast({
      title: "Added to cart",
      description: "Item added to your cart",
    });
  };
  
  const calculateTotal = () => {
    let total = 0;
    
    Object.entries(cart).forEach(([itemId, quantity]) => {
      const allItems = [
        ...concessions.combos,
        ...concessions.popcorn,
        ...concessions.drinks,
        ...concessions.snacks
      ];
      
      const item = allItems.find(item => item.id === itemId);
      if (item) {
        total += item.price * quantity;
      }
    });
    
    return total;
  };
  
  const handleCheckout = () => {
    toast({
      title: "Order successful",
      description: "Your order has been confirmed!",
    });
    
    // In a real app, this would navigate to a payment page or confirmation page
    navigate('/');
  };
  
  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Concessions</h1>
              <p className="text-gray-400">Complete your movie experience with delicious treats!</p>
            </div>
            
            <Button 
              variant="outline" 
              className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-cinema-dark"
              onClick={() => {
                document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="mr-1">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-cinema-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left column - Concession items */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="combos" className="w-full">
                <TabsList className="bg-cinema-secondary mb-6">
                  <TabsTrigger value="combos" className="data-[state=active]:bg-cinema-primary">Combos</TabsTrigger>
                  <TabsTrigger value="popcorn" className="data-[state=active]:bg-cinema-primary">Popcorn</TabsTrigger>
                  <TabsTrigger value="drinks" className="data-[state=active]:bg-cinema-primary">Drinks</TabsTrigger>
                  <TabsTrigger value="snacks" className="data-[state=active]:bg-cinema-primary">Snacks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="combos" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {concessions.combos.map((item) => (
                      <ConcessionItem 
                        key={item.id} 
                        {...item} 
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="popcorn" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {concessions.popcorn.map((item) => (
                      <ConcessionItem 
                        key={item.id} 
                        {...item} 
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="drinks" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {concessions.drinks.map((item) => (
                      <ConcessionItem 
                        key={item.id} 
                        {...item} 
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="snacks" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {concessions.snacks.map((item) => (
                      <ConcessionItem 
                        key={item.id} 
                        {...item} 
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Cart */}
            <div id="cart">
              <Card className="bg-cinema-secondary border-gray-800 sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Your Cart
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {cartItemCount > 0 ? (
                    <>
                      {Object.entries(cart).map(([itemId, quantity]) => {
                        if (quantity === 0) return null;
                        
                        const allItems = [
                          ...concessions.combos,
                          ...concessions.popcorn,
                          ...concessions.drinks,
                          ...concessions.snacks
                        ];
                        
                        const item = allItems.find(item => item.id === itemId);
                        if (!item) return null;
                        
                        return (
                          <div key={itemId} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-400">${item.price.toFixed(2)} x {quantity}</div>
                            </div>
                            <div className="font-medium">${(item.price * quantity).toFixed(2)}</div>
                          </div>
                        );
                      })}
                      
                      <Separator className="bg-gray-800 my-4" />
                      
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <div>Total</div>
                        <div className="text-cinema-gold">${calculateTotal().toFixed(2)}</div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-10 w-10 mx-auto text-gray-500 mb-3" />
                      <h3 className="font-medium mb-1">Your cart is empty</h3>
                      <p className="text-sm text-gray-400">Add some delicious treats to enhance your movie experience!</p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className="border-gray-700"
                      onClick={() => navigate('/seats/1')}
                    >
                      Back to Seats
                    </Button>
                    <Button 
                      onClick={handleCheckout}
                      disabled={cartItemCount === 0}
                      className="bg-cinema-primary hover:bg-cinema-primary/90"
                    >
                      Complete Order
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Concessions;
