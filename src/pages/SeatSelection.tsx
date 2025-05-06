
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Film, Clock, Calendar, User, Info } from 'lucide-react';
import { RoomDisplay } from '@/components/RoomDisplay';

type Seat = {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'occupied';
  type: 'standard' | 'vip' | 'disabled';
  price: number;
};

// Sample data - in a real app, this would come from an API
const movieDetails = {
  id: "1",
  title: "Dune: Part Two",
  posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  duration: "2h 46m",
  rating: "PG-13"
};

// Function to generate seating layout
const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  const seats: Seat[] = [];
  
  rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
      // Create a few random occupied seats
      const isOccupied = Math.random() < 0.2;
      const isVIP = row === 'A' || row === 'B';
      const isDisabled = row === 'H' && (i === 1 || i === 2);
      
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: isOccupied ? 'occupied' : 'available',
        type: isDisabled ? 'disabled' : isVIP ? 'vip' : 'standard',
        price: isVIP ? 18.99 : 12.99
      });
    }
  });
  
  return seats;
};

// Available theaters and showtimes
const theaters = [
  { 
    id: "1", 
    name: "IMAX Downtown", 
    rooms: [
      { id: "room1", name: "Sala 1 - IMAX" },
      { id: "room2", name: "Sala 2 - IMAX" }
    ]
  },
  { 
    id: "2", 
    name: "Standard Multiplex",
    rooms: [
      { id: "room3", name: "Sala 1 - Standard" },
      { id: "room4", name: "Sala 2 - Standard" },
      { id: "room5", name: "Sala 3 - Standard" }
    ] 
  }
];

const showtimes = [
  { id: "1", time: "10:30 AM", theater: "IMAX", room: "room1", date: "Today" },
  { id: "2", time: "1:45 PM", theater: "IMAX", room: "room1", date: "Today" },
  { id: "3", time: "5:15 PM", theater: "IMAX", room: "room2", date: "Today" },
  { id: "4", time: "8:45 PM", theater: "IMAX", room: "room2", date: "Today" },
  { id: "5", time: "11:15 AM", theater: "Standard", room: "room3", date: "Today" },
  { id: "6", time: "2:30 PM", theater: "Standard", room: "room3", date: "Today" },
  { id: "7", time: "6:00 PM", theater: "Standard", room: "room4", date: "Today" },
  { id: "8", time: "9:15 PM", theater: "Standard", room: "room5", date: "Today" }
];

const SeatSelection = () => {
  const { id } = useParams<{ id: string }>();
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedShowtime, setSelectedShowtime] = useState(showtimes[0]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedTheater, setSelectedTheater] = useState(theaters[0]);
  const [selectedRoom, setSelectedRoom] = useState(theaters[0].rooms[0]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Update the room when showtime changes
  useEffect(() => {
    const theaterInfo = theaters.find(t => t.name.includes(selectedShowtime.theater)) || theaters[0];
    setSelectedTheater(theaterInfo);
    
    const roomInfo = theaterInfo.rooms.find(r => r.id === selectedShowtime.room) || theaterInfo.rooms[0];
    setSelectedRoom(roomInfo);
    
    // Regenerate seats when selected showtime changes
    setSeats(generateSeats());
    setSelectedSeats([]);
  }, [selectedShowtime]);
  
  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.status === 'occupied') return;
    
    // Toggle selection
    if (clickedSeat.status === 'selected') {
      setSelectedSeats(selectedSeats.filter(seat => seat.id !== clickedSeat.id));
      setSeats(seats.map(seat => 
        seat.id === clickedSeat.id 
          ? { ...seat, status: 'available' } 
          : seat
      ));
    } else {
      // Limit to 6 seats max
      if (selectedSeats.length >= 6) {
        toast({
          title: "Máximo de assentos atingido",
          description: "Você pode selecionar até 6 assentos por reserva.",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedSeats([...selectedSeats, clickedSeat]);
      setSeats(seats.map(seat => 
        seat.id === clickedSeat.id 
          ? { ...seat, status: 'selected' } 
          : seat
      ));
    }
  };
  
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "Nenhum assento selecionado",
        description: "Por favor, selecione pelo menos um assento para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reserva concluída com sucesso!",
      description: `Você reservou ${selectedSeats.length} assento(s) para ${movieDetails.title}`,
    });
    
    // Redirect to concessions page
    navigate('/concessions');
  };
  
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);
  
  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <Film className="mr-3 h-8 w-8" />
              Selecione seus assentos
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Seat selection */}
            <div className="lg:col-span-2">
              <Card className="bg-cinema-secondary border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{movieDetails.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{movieDetails.duration}</span>
                      </div>
                      <div>{movieDetails.rating}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Theater selector */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Cinema e Sala</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-2">Cinema:</label>
                        <div className="bg-cinema-dark rounded-md p-3 border border-gray-800">
                          {selectedTheater.name}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-2">Sala:</label>
                        <div className="bg-cinema-dark rounded-md p-3 border border-gray-800">
                          {selectedRoom.name}
                        </div>
                      </div>
                    </div>
                  </div>
                
                  {/* Room visualization */}
                  <div className="mb-6">
                    <RoomDisplay 
                      roomName={selectedRoom.name} 
                      theaterName={selectedTheater.name}
                      occupancyPercentage={Math.floor(seats.filter(s => s.status === 'occupied').length / seats.length * 100)}
                      capacity={seats.length}
                    />
                  </div>
                
                  {/* Showtimes tabs */}
                  <div className="mb-8">
                    <Tabs defaultValue={selectedShowtime.id} onValueChange={(value) => {
                      const showtime = showtimes.find(s => s.id === value);
                      if (showtime) setSelectedShowtime(showtime);
                    }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Selecione um horário:</span>
                        </div>
                        <TabsList className="bg-cinema-dark">
                          <TabsTrigger 
                            value="Today" 
                            className="data-[state=active]:bg-cinema-primary"
                            disabled
                          >
                            Hoje
                          </TabsTrigger>
                          <TabsTrigger 
                            value="Tomorrow" 
                            className="data-[state=active]:bg-cinema-primary"
                            disabled
                          >
                            Amanhã
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {showtimes.map((showtime) => (
                          <TabsTrigger 
                            key={showtime.id}
                            value={showtime.id} 
                            className="data-[state=active]:bg-cinema-primary data-[state=active]:text-white"
                          >
                            <div className="text-center">
                              <div className="font-medium">{showtime.time}</div>
                              <div className="text-xs opacity-70">
                                {theaters.find(t => t.name.includes(showtime.theater))?.rooms.find(r => r.id === showtime.room)?.name || showtime.theater}
                              </div>
                            </div>
                          </TabsTrigger>
                        ))}
                      </div>
                    </Tabs>
                  </div>
                  
                  {/* Screen */}
                  <div className="mb-10">
                    <div className="w-[90%] h-2 bg-cinema-primary mx-auto rounded mb-2"></div>
                    <p className="text-center text-sm text-gray-400 mb-8">TELA</p>
                    
                    {/* Seating layout */}
                    <div className="w-full overflow-auto">
                      <div className="min-w-[600px]">
                        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                          <div key={row} className="flex justify-center mb-2">
                            <div className="w-6 flex items-center justify-center mr-2">
                              <span className="text-sm text-gray-400">{row}</span>
                            </div>
                            <div className="flex justify-center">
                              {rowSeats.map((seat) => (
                                <button
                                  key={seat.id}
                                  onClick={() => handleSeatClick(seat)}
                                  disabled={seat.status === 'occupied'}
                                  className={`seat ${
                                    seat.status === 'available' 
                                      ? seat.type === 'vip' 
                                        ? 'bg-cinema-gold text-cinema-dark hover:bg-cinema-gold/80' 
                                        : seat.type === 'disabled' 
                                          ? 'bg-blue-500 text-white hover:bg-blue-400' 
                                          : 'seat-available' 
                                      : seat.status === 'selected' 
                                        ? 'seat-selected' 
                                        : 'seat-occupied'
                                  }`}
                                >
                                  {seat.number}
                                </button>
                              ))}
                            </div>
                            <div className="w-6"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="seat-available w-6 h-6"></div>
                      <span className="text-sm text-gray-400">Disponível</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="seat-selected w-6 h-6"></div>
                      <span className="text-sm text-gray-400">Selecionado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="seat-occupied w-6 h-6"></div>
                      <span className="text-sm text-gray-400">Ocupado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-cinema-gold"></div>
                      <span className="text-sm text-gray-400">VIP (R$18.99)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-blue-500"></div>
                      <span className="text-sm text-gray-400">Acessibilidade</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Order summary */}
            <div>
              <Card className="bg-cinema-secondary border-gray-800 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-xl">Resumo da Reserva</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{movieDetails.title}</div>
                    <div className="text-gray-400">{movieDetails.rating}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-400">Data</div>
                    <div>{selectedShowtime.date}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-400">Horário</div>
                    <div>{selectedShowtime.time}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-400">Sala</div>
                    <div>{selectedRoom.name}</div>
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div>
                    <div className="font-medium mb-2">Assentos Selecionados</div>
                    {selectedSeats.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seat) => (
                          <div 
                            key={seat.id} 
                            className={`px-2 py-1 rounded text-sm ${
                              seat.type === 'vip' 
                                ? 'bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/50' 
                                : 'bg-cinema-primary/20 text-cinema-primary border border-cinema-primary/50'
                            }`}
                          >
                            {seat.row}{seat.number} - R${seat.price.toFixed(2)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">Nenhum assento selecionado</div>
                    )}
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-400">Assentos ({selectedSeats.length})</div>
                      <div>R${totalPrice.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-400">Taxa de Reserva</div>
                      <div>R${(selectedSeats.length * 1.50).toFixed(2)}</div>
                    </div>
                    
                    <div className="flex justify-between items-center font-semibold pt-2">
                      <div>Total</div>
                      <div className="text-lg text-cinema-gold">
                        R${(totalPrice + selectedSeats.length * 1.50).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="bg-cinema-dark border-cinema-primary/30">
                    <Info className="h-4 w-4 text-cinema-primary" />
                    <AlertTitle className="text-sm">Adicione lanches!</AlertTitle>
                    <AlertDescription className="text-xs text-gray-400">
                      Você terá a opção de adicionar lanches e bebidas após confirmar seus assentos.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={handleContinue}
                    disabled={selectedSeats.length === 0}
                    className="w-full bg-cinema-primary hover:bg-cinema-primary/90"
                  >
                    {selectedSeats.length > 0 
                      ? `Continuar para Lanches` 
                      : `Selecione assentos para continuar`
                    }
                  </Button>
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

export default SeatSelection;
