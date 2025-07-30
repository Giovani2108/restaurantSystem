
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  MinusCircle, 
  Save, 
  Trash2, 
  Coffee, 
  UtensilsCrossed, 
  Users,
  X,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableForm } from '@/components/TableForm';
import { OrderForm } from '@/components/OrderForm';

export function ConfigPanel({ tables, updateTable, addTable, deleteTable, menuItems, onClose }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeTab, setActiveTab] = useState('tables');

  const handleSelectTable = (table) => {
    setSelectedTable(table);
    setActiveTab('tableDetails');
  };

  const handleUpdateTable = (updatedTable) => {
    updateTable(updatedTable);
    setSelectedTable(updatedTable);
  };

  const handleAddOrder = (tableId, newOrder) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    
    const nextOrderId = table.orders.length > 0 
      ? Math.max(...table.orders.map(o => o.id)) + 1 
      : 1;
    
    const updatedOrders = [
      ...table.orders,
      { ...newOrder, id: nextOrderId }
    ];
    
    const updatedTable = {
      ...table,
      orders: updatedOrders,
      status: 'occupied'
    };
    
    updateTable(updatedTable);
    setSelectedTable(updatedTable);
  };

  const handleDeleteOrder = (tableId, orderId) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    
    const updatedOrders = table.orders.filter(order => order.id !== orderId);
    
    const updatedTable = {
      ...table,
      orders: updatedOrders,
      status: updatedOrders.length === 0 && table.status === 'occupied' ? 'available' : table.status
    };
    
    updateTable(updatedTable);
    setSelectedTable(updatedTable);
  };

  const handleDeleteTable = () => {
    if (selectedTable) {
      deleteTable(selectedTable.id);
      setSelectedTable(null);
      setActiveTab('tables');
    }
  };

  return (
    <motion.div 
      className="w-96 bg-card shadow-xl border-l overflow-auto flex flex-col"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b flex justify-between items-center bg-muted sticky top-0 z-10">
        <h2 className="text-xl font-bold">Configuración</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex border-b sticky top-[65px] z-10 bg-card">
        <button 
          className={`flex-1 py-3 px-4 text-center text-sm font-medium ${activeTab === 'tables' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
          onClick={() => { setSelectedTable(null); setActiveTab('tables');}}
        >
          Mesas
        </button>
        {selectedTable && (
          <button 
            className={`flex-1 py-3 px-4 text-center text-sm font-medium ${activeTab === 'tableDetails' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            onClick={() => setActiveTab('tableDetails')}
          >
            Detalles
          </button>
        )}
        {selectedTable && (
          <button 
            className={`flex-1 py-3 px-4 text-center text-sm font-medium ${activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            onClick={() => setActiveTab('orders')}
          >
            Pedidos
          </button>
        )}
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === 'tables' && (
          <div>
            <Button 
              onClick={addTable}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle className="h-4 w-4" />
              Añadir Mesa
            </Button>
            
            <div className="space-y-2">
              {tables.sort((a,b) => a.number - b.number).map(table => (
                <div 
                  key={table.id}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-muted/80 flex justify-between items-center transition-colors ${selectedTable?.id === table.id ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                  onClick={() => handleSelectTable(table)}
                >
                  <div>
                    <div className="font-medium text-foreground">{table.name ? `${table.name} (Mesa ${table.number})` : `Mesa ${table.number}`}</div>
                    <div className="text-xs text-muted-foreground">
                      Capacidad: {table.capacity} | Estado: {
                        table.status === 'available' ? 'Disponible' :
                        table.status === 'occupied' ? 'Ocupada' : 'Reservada'
                      }
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    table.status === 'available' ? 'bg-green-500' :
                    table.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'tableDetails' && selectedTable && (
          <div>
            <TableForm 
              table={selectedTable} 
              onUpdate={handleUpdateTable} 
              onDelete={handleDeleteTable}
            />
          </div>
        )}
        
        {activeTab === 'orders' && selectedTable && (
          <div>
            <OrderForm 
              table={selectedTable}
              menuItems={menuItems}
              onAddOrder={(newOrder) => handleAddOrder(selectedTable.id, newOrder)}
              onDeleteOrder={(orderId) => handleDeleteOrder(selectedTable.id, orderId)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
