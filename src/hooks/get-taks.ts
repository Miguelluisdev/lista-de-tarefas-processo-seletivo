import { Task } from "@/@types/task"
import { useEffect, useState } from "react"
import { formatDate } from "./format-date"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://backend-oyy1.onrender.com/tasks")
        if (!response.ok) {
          throw new Error("Erro de network")
        }
        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          setTasks(
            data.data.map((task: Task) => ({
              ...task,
              limitDate: formatDate(task.limitDate),
            })),
          )
        } else {
          console.error("Dados no formato errado", data)
          setError("Erro ao carregar as tarefas")
        }
      } catch (error) {
        console.error("Erro ao requisitar as tarefas", error)
        setError("Erro da api verificar")
      }
    }

    fetchTasks()
  }, [])

  return { tasks, error }
}
