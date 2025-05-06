
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RoomDisplayProps {
  roomName: string;
  theaterName: string;
  occupancyPercentage: number;
  capacity: number;
}

export const RoomDisplay: React.FC<RoomDisplayProps> = ({
  roomName,
  theaterName,
  occupancyPercentage,
  capacity
}) => {
  return (
    <Card className="bg-cinema-dark border-gray-800">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h4 className="text-lg font-medium">{roomName}</h4>
            <p className="text-sm text-gray-400">{theaterName}</p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            <div className="px-2 py-1 bg-opacity-20 bg-cinema-primary rounded text-xs">
              {capacity} lugares
            </div>
            <div className={`px-2 py-1 rounded text-xs ${
              occupancyPercentage > 80 
                ? 'bg-red-500/20 text-red-400' 
                : occupancyPercentage > 50 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : 'bg-green-500/20 text-green-400'
            }`}>
              {occupancyPercentage}% ocupação
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Ocupação da sala</span>
            <span>{occupancyPercentage}%</span>
          </div>
          <Progress 
            value={occupancyPercentage} 
            className="h-2 bg-gray-700" 
            indicatorClassName={`${
              occupancyPercentage > 80 
                ? 'bg-red-500' 
                : occupancyPercentage > 50 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
            }`}
          />
        </div>
        
        <div className="bg-cinema-secondary/50 rounded-lg p-4 relative">
          <div className="flex flex-col items-center">
            <div className="w-3/4 h-1 bg-cinema-primary mb-6 rounded"></div>
            <p className="text-xs text-gray-400 mb-4 absolute top-4">TELA</p>
            
            <div className="grid grid-cols-5 gap-1">
              {Array(15).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-sm ${Math.random() > 0.2 ? 'bg-green-500/30' : 'bg-red-500/30'}`}
                ></div>
              ))}
            </div>
            
            <div className="w-full text-center mt-6">
              <p className="text-xs text-gray-400">Visualização simplificada da sala</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
