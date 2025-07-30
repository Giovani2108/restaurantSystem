
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header({ toggleConfig }) {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UtensilsCrossed className="h-6 w-6" />
          <h1 className="text-xl font-bold">Restaurante POS</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={toggleConfig}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
