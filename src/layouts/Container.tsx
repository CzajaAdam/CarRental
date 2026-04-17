import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};
