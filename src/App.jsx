
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { 
  Settings, 
  PlusCircle, 
  MinusCircle, 
  Save, 
  Trash2, 
  Coffee, 
  UtensilsCrossed, 
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RestaurantLayout } from '@/components/RestaurantLayout';
import { Header } from '@/components/Header';
import { ConfigPanel } from '@/components/ConfigPanel';

const MENU_ITEMS = [
  { id: 'cafe-americano', name: 'Café Americano', price: 35 },
  { id: 'cafe-latte', name: 'Café Latte', price: 45 },
  { id: 'te-chai', name: 'Té Chai', price: 40 },
  { id: 'croissant', name: 'Croissant de Almendras', price: 55 },
  { id: 'filete-mignon', name: 'Filete Mignon', price: 450 },
  { id: 'vino-tinto', name: 'Copa de Vino Tinto Reserva', price: 180 },
  { id: 'agua-gas', name: 'Agua con Gas Premium', price: 60 },
  { id: 'pizza-pepperoni', name: 'Pizza Pepperoni', price: 220 },
  { id: 'ensalada-cesar', name: 'Ensalada César con Pollo', price: 180 },
  { id: 'pasta-bolognesa', name: 'Pasta Bolognesa', price: 200 },
  { id: 'tiramisu', name: 'Tiramisú Clásico', price: 120 },
];


function App() {
  const { toast } = useToast();
  const [tables, setTables] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  
  useEffect(() => {
    const savedTables = localStorage.getItem('restaurantTables');
    if (savedTables) {
      try {
        setTables(JSON.parse(savedTables));
      } catch (error) {
        console.error('Error loading tables from localStorage:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar las mesas guardadas.",
        });
      }
    } else {
      const defaultTables = [
        { id: 1, number: 1, name: '', x: 100, y: 100, width: 110, height: 110, shape: 'round', status: 'available', capacity: 2, orders: [], arrivalTime: null },
        { id: 2, number: 2, name: 'Ventana VIP', x: 300, y: 100, width: 110, height: 110, shape: 'round', status: 'occupied', capacity: 2, orders: [
          { id: 1, name: 'Café Americano', price: 35, quantity: 2 },
          { id: 2, name: 'Croissant de Almendras', price: 55, quantity: 1 }
        ], arrivalTime: null },
        { id: 3, number: 3, name: '', x: 500, y: 100, width: 110, height: 110, shape: 'round', status: 'available', capacity: 2, orders: [], arrivalTime: null },
        { id: 4, number: 4, name: 'Familia López', x: 100, y: 300, width: 160, height: 110, shape: 'rectangle', status: 'reserved', capacity: 4, orders: [], arrivalTime: '20:30' },
        { id: 5, number: 5, name: '', x: 320, y: 300, width: 160, height: 110, shape: 'rectangle', status: 'occupied', capacity: 4, orders: [
          { id: 3, name: 'Filete Mignon', price: 450, quantity: 1 },
          { id: 4, name: 'Copa de Vino Tinto Reserva', price: 180, quantity: 2 },
          { id: 5, name: 'Agua con Gas Premium', price: 60, quantity: 2 }
        ], arrivalTime: null },
        { id: 6, number: 6, name: 'Grupo Grande', x: 100, y: 500, width: 220, height: 110, shape: 'rectangle', status: 'available', capacity: 6, orders: [], arrivalTime: null },
      ];
      setTables(defaultTables);
      localStorage.setItem('restaurantTables', JSON.stringify(defaultTables));
    }
  }, [toast]);

  useEffect(() => {
    if (tables.length > 0) {
      localStorage.setItem('restaurantTables', JSON.stringify(tables));
    }
  }, [tables]);

  const toggleConfigPanel = () => {
    setShowConfig(!showConfig);
  };

  const updateTable = (updatedTable) => {
    setTables(tables.map(table => 
      table.id === updatedTable.id ? updatedTable : table
    ));
    toast({
      title: "Mesa actualizada",
      description: `Mesa ${updatedTable.name || updatedTable.number} ha sido actualizada.`,
      className: 'bg-primary text-primary-foreground'
    });
  };

  const addTable = (newTable) => {
    const nextId = Math.max(0, ...tables.map(t => t.id)) + 1;
    const nextNumber = Math.max(0, ...tables.map(t => t.number)) + 1;
    
    const table = {
      id: nextId,
      number: nextNumber,
      name: '',
      x: 50,
      y: 50,
      width: 110,
      height: 110,
      shape: 'round',
      status: 'available',
      capacity: 2,
      orders: [],
      arrivalTime: null
    };
    
    setTables([...tables, table]);
    toast({
      title: "Mesa añadida",
      description: `Mesa ${nextNumber} ha sido añadida.`,
      className: 'bg-primary text-primary-foreground'
    });
  };

  const deleteTable = (tableId) => {
    setTables(tables.filter(table => table.id !== tableId));
    toast({
      variant: "destructive",
      title: "Mesa eliminada",
      description: "La mesa ha sido eliminada correctamente.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header toggleConfig={toggleConfigPanel} />
      
      <main className="flex-1 flex overflow-hidden">
        <RestaurantLayout 
          tables={tables} 
          updateTable={updateTable}
          isConfigMode={showConfig}
        />
        
        {showConfig && (
          <ConfigPanel 
            tables={tables}
            updateTable={updateTable}
            addTable={addTable}
            deleteTable={deleteTable}
            menuItems={MENU_ITEMS}
            onClose={toggleConfigPanel}
          />
        )}
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;
