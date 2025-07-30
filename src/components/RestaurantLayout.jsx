
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Coffee, CheckCircle, XCircle, Clock, Printer, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function RestaurantLayout({ tables, updateTable, isConfigMode }) {
  const { toast } = useToast();
  const layoutRef = useRef(null);

  const handleDragEnd = (event, info, table) => {
    if (!isConfigMode || !layoutRef.current) return;

    const layoutRect = layoutRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(table.x + info.offset.x, layoutRect.width - table.width));
    const newY = Math.max(0, Math.min(table.y + info.offset.y, layoutRect.height - table.height));

    const updatedTable = {
      ...table,
      x: newX,
      y: newY,
    };
    updateTable(updatedTable);
  };

  const calculateTotal = (orders) => {
    return orders.reduce((total, order) => total + (order.price * order.quantity), 0);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'occupied': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'reserved': return <Clock className="h-5 w-5 text-yellow-400" />;
      default: return null;
    }
  };

  const handlePrintTicket = (table) => {
    toast({
      title: `Imprimiendo ticket para Mesa ${table.name || table.number}`,
      description: `Total: $${calculateTotal(table.orders).toFixed(2)}. (Funcionalidad de impresión simulada)`,
      className: 'bg-primary text-primary-foreground'
    });
  };

  return (
    <div 
      ref={layoutRef}
      className="restaurant-layout flex-1 relative overflow-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold mb-8 text-center text-primary"
      >
        Salón Principal
      </motion.div>
      
      {tables.map((table) => (
        <motion.div
          key={table.id}
          className={`table table-${table.shape} table-${table.status} absolute ${isConfigMode ? 'cursor-grab' : 'cursor-pointer'}`}
          style={{
            width: `${table.width}px`,
            height: `${table.height}px`,
          }}
          initial={{ x: table.x, y: table.y, opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ x: table.x, y: table.y, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: table.id * 0.05 }}
          drag={isConfigMode}
          dragConstraints={layoutRef}
          onDragEnd={(event, info) => handleDragEnd(event, info, table)}
          dragMomentum={false}
        >
          <div className="table-number">{table.number}</div>
          {table.name && <div className="table-custom-name">{table.name}</div>}
          
          <div className="table-capacity">
            <Users className="h-3 w-3 mr-1" />
            <span>{table.capacity}</span>
          </div>
          
          <div className="table-tooltip">
            <div className="font-bold text-xl mb-3 flex justify-between items-center text-primary">
              <span>{table.name ? `${table.name} (Mesa ${table.number})` : `Mesa ${table.number}`}</span>
              {getStatusIcon(table.status)}
            </div>
            
            <div className="text-sm mb-1 flex items-center text-muted-foreground">
              <span>Estado:</span>
              <span className={`ml-2 font-semibold ${
                table.status === 'available' ? 'text-green-400' :
                table.status === 'occupied' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {table.status === 'available' ? 'Disponible' :
                 table.status === 'occupied' ? 'Ocupada' : 'Reservada'}
              </span>
            </div>

            {table.status === 'reserved' && table.arrivalTime && (
              <div className="text-sm mb-1 flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1 text-yellow-400" />
                <span>Llegada estimada: {table.arrivalTime}</span>
              </div>
            )}
            
            <div className="text-sm mb-3 flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>Capacidad: {table.capacity} personas</span>
            </div>
            
            {table.orders && table.orders.length > 0 ? (
              <div>
                <div className="font-semibold mb-2 flex items-center text-primary">
                  <Coffee className="h-5 w-5 mr-2" />
                  <span>Pedidos Activos:</span>
                </div>
                <ul className="text-sm space-y-1.5 max-h-40 overflow-y-auto pr-2">
                  {table.orders.map(order => (
                    <li key={order.id} className="flex justify-between items-center py-1 border-b border-dashed border-border">
                      <span className="text-foreground">{order.quantity}x {order.name}</span>
                      <span className="text-muted-foreground">${(order.price * order.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-primary flex justify-between font-bold text-lg">
                  <span className="text-primary">Total:</span>
                  <span className="text-primary">${calculateTotal(table.orders).toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground italic mt-2">
                No hay pedidos activos en esta mesa.
              </div>
            )}
            {table.orders && table.orders.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4 flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
                onClick={() => handlePrintTicket(table)}
              >
                <Printer className="h-4 w-4"/>
                Imprimir Ticket
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
