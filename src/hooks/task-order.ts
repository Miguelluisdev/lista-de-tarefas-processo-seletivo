
import { useEffect, useState } from "react";

export const useTaskReorder = (initialTasks: any) => {
  const [localTasks, setLocalTasks] = useState(initialTasks);

  useEffect(() => {
    setLocalTasks(initialTasks);
  }, [initialTasks]);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newTasks = [...localTasks];
    const [movedTask] = newTasks.splice(index, 1);
    newTasks.splice(index - 1, 0, movedTask);
    setLocalTasks(newTasks);
  };

  const handleMoveDown = (index: number) => {
    if (index === localTasks.length - 1) return;
    const newTasks = [...localTasks];
    const [movedTask] = newTasks.splice(index, 1);
    newTasks.splice(index + 1, 0, movedTask);
    setLocalTasks(newTasks);
  };

  return { localTasks, handleMoveUp, handleMoveDown, setLocalTasks };
};
