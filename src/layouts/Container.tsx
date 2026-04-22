import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`flex min-h-screen bg-gray-100`}>
      <main className={'flex-1 p-6 ' + (className ?? '')}>{children}</main>
    </div>
  );
};
