
import React, { useState, useEffect } from 'react';
import { Save, Trash2, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function TableForm({ table, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    number: table.number,
    name: table.name || '',
    capacity: table.capacity,
    shape: table.shape,
    status: table.status,
    width: table.width,
    height: table.height,
    arrivalTime: table.arrivalTime || ''
  });

  useEffect(() => {
    setFormData({
        number: table.number,
        name: table.name || '',
        capacity: table.capacity,
        shape: table.shape,
        status: table.status,
        width: table.width,
        height: table.height,
        arrivalTime: table.arrivalTime || ''
      });
  }, [table]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'number' || name === 'capacity' || name === 'width' || name === 'height' 
        ? parseInt(value, 10) 
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...table,
      ...formData,
      arrivalTime: formData.status === 'reserved' ? formData.arrivalTime : null
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-foreground"
    >
      <h3 className="text-xl font-bold mb-6 text-primary">
        {table.name ? `${table.name} (Mesa ${table.number})` : `Editar Mesa ${table.number}`}
      </h3>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Número de Mesa</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground flex items-center">
            <Tag className="h-4 w-4 mr-1 text-muted-foreground"/> Nombre Personalizado (Opcional)
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Mesa de Emiliano"
            className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Capacidad</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
            min="1"
            max="12"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Forma</label>
          <select
            name="shape"
            value={formData.shape}
            onChange={handleChange}
            className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="round">Redonda</option>
            <option value="square">Cuadrada</option>
            <option value="rectangle">Rectangular</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="available">Disponible</option>
            <option value="occupied">Ocupada</option>
            <option value="reserved">Reservada</option>
          </select>
        </div>

        {formData.status === 'reserved' && (
           <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1 text-yellow-400"/> Hora Estimada de Llegada
            </label>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Ancho (px)</label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
              min="80"
              max="300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Alto (px)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-2.5 border bg-input border-border rounded-md focus:ring-primary focus:border-primary"
              min="80"
              max="300"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-6">
          <Button 
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="h-4 w-4" />
            Guardar Cambios
          </Button>
          
          <Button 
            type="button"
            variant="destructive"
            onClick={onDelete}
            className="flex items-center justify-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar Mesa
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
