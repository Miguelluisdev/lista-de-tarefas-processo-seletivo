import { useEffect, useState } from "react"

interface Task {
  id: number
  name: string
  cost: number
  limitDate: string
  order: number
}

export function useTaskReorder(initialTasks: Task[] = []) {
  const [localTasks, setLocalTasks] = useState<Task[]>([])

  useEffect(() => {
    setLocalTasks(initialTasks)
  }, [initialTasks])

  const saveOrderToServer = async (tasks: Task[]) => {
    try {
      const reorderedTasks = tasks.map((task, index) => ({
        id: task.id,
        order: index,
      }))

      const response = await fetch("https://backend-oyy1.onrender.com/tasks/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reorderedTasks }),
      })

      if (!response.ok) {
        console.error("Falha ao salvar a reordenação no servidor.")
      }
    } catch (error) {
      console.error("Erro ao salvar a ordem no servidor:", error)
    }
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    const updatedTasks = [...localTasks]
    ;[updatedTasks[index], updatedTasks[index - 1]] = [
      updatedTasks[index - 1],
      updatedTasks[index],
    ]
    setLocalTasks(updatedTasks)
    saveOrderToServer(updatedTasks)
  }

  const handleMoveDown = (index: number) => {
    if (index >= localTasks.length - 1) return
    const updatedTasks = [...localTasks]
    ;[updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ]
    setLocalTasks(updatedTasks)
    saveOrderToServer(updatedTasks)
  }

  return {
    localTasks,
    handleMoveUp,
    handleMoveDown,
    setLocalTasks,
  }
}
