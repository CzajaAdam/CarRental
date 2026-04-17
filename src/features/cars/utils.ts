export const canActionBePerfomed = (action: string, status: string) => {
  const actionStatusMap: Record<string, string[]> = {
    rent: ["available"],
    return: ["rented", "overdue"],
  };
  return actionStatusMap[action]?.includes(status) || false;
};

export const isOverdue = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  return now > due;
};
