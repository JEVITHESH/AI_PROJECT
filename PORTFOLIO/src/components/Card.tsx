import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = ({ children, className, hoverEffect = true, ...props }: CardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        'glass rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
