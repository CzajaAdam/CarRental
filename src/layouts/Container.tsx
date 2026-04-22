import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <main className={`p-6 ${className ?? ''}`}>{children}</main>
      </div>
    </div>
  );
};
