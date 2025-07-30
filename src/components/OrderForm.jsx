
import React, { useState } from 'react';
import { PlusCircle, Trash2, Coffee, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function OrderForm({ table, menuItems, onAddOrder, onDeleteOrder }) {
  const [newOrder, setNewOrder] = useState({
    name: '',
    price: '',
    quantity: 1
  });
  const [showQuickMenu, setShowQuickMenu] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: name === 'price' || name === 'quantity' 
        ? (value === '' ? '' : parseFloat(value)) 
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newOrder.name || newOrder.price === '' || newOrder.price < 0) return;
    
    onAddOrder({
      name: newOrder.name,
      price: newOrder.price,
      quantity: newOrder.quantity || 1
    });
    
    setNewOrder({
      name: '',
      price: '',
      quantity: 1
    });
  };

  const calculateTotal = () => {
    return table.orders.reduce((total, order) => total + (order.price * order.quantity), 0);
  };

  const handleSelectMenuItem = (item) => {
    setNewOrder({
      name: item.name,
      price: item.price,
      quantity: 1
    });
  };

  return (
    <div className="text-foreground">
      <h3 className="text-xl font-bold mb-6 text-primary">
        Pedidos - {table.name ? `${table.name} (Mesa ${table.number})` : `Mesa ${table.number}`}
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Producto</label>
            <input
              type="text"
              name="name"
              value={newOrder.name}
              onChange={handleChange}
              className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
              placeholder="Nombre del producto"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Precio ($)</label>
              <input
                type="number"
                name="price"
                value={newOrder.price}
                onChange={handleChange}
                className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={newOrder.quantity}
                onChange={handleChange}
                className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
                min="1"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <PlusCircle className="h-4 w-4" />
            Añadir Pedido
          </Button>
        </div>
      </form>
      
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center mb-2 text-muted-foreground hover:text-foreground"
          onClick={() => setShowQuickMenu(!showQuickMenu)}
        >
          <span>Menú Rápido</span>
          {showQuickMenu ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        <AnimatePresence>
        {showQuickMenu && (
          <motion.div 
            className="grid grid-cols-2 gap-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.id}
                type="button"
                variant="outline"
                className="text-xs p-2.5 h-auto border-border hover:border-primary flex flex-col items-start text-left"
                onClick={() => handleSelectMenuItem(item)}
              >
                <div className="font-medium text-foreground">{item.name}</div>
                <div className="text-muted-foreground">${item.price.toFixed(2)}</div>
              </Button>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      
      <div>
        <h4 className="font-medium mb-3 flex items-center text-lg text-primary">
          <Coffee className="h-5 w-5 mr-2" />
          Pedidos Actuales
        </h4>
        
        {table.orders.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No hay pedidos en esta mesa.</p>
        ) : (
          <motion.div layout className="space-y-3">
            {table.orders.map((order) => (
              <motion.div
                key={order.id}
                className="flex justify-between items-center p-3 border border-border rounded-md bg-muted/30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <div className="font-medium text-foreground">{order.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.quantity} x ${order.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium mr-3 text-foreground">
                    ${(order.quantity * order.price).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteOrder(order.id)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
            
            <div className="flex justify-between font-bold pt-3 border-t border-primary mt-4 text-lg">
              <span className="text-primary">Total:</span>
              <span className="text-primary">${calculateTotal().toFixed(2)}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
