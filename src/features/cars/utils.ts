export const canActionBePerformed = (action: string, status: string): boolean => {
  const actionStatusMap: Record<string, string[]> = {
    rent: ['available'],
    return: ['rented', 'overdue'],
  };
  return actionStatusMap[action]?.includes(status) || false;
};

export const isOverdue = (dueDate: string): boolean => {
  const now = new Date();
  const due = new Date(dueDate);
  return now > due;
};
