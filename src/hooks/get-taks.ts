import { Task } from "@/@types/task"
import { useEffect, useReducer } from "react"
import { formatDate } from "../lib/format-date"

type State = {
  tasks: Task[]
  error: string | null
  loading: boolean
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Task[] }
  | { type: "FETCH_ERROR"; payload: string }

const initialState: State = {
  tasks: [],
  error: null,
  loading: false,
}

const tasksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, tasks: action.payload }
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload }
    default:
      throw new Error(`Error ao solictae`)
  }
}

export const useTasks = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState)

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: "FETCH_START" })
      try {
        const response = await fetch("https://backend-oyy1.onrender.com/tasks")
        if (!response.ok) {
          throw new Error("Erro ao carregar as tarefas")
        }

        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          const formattedTasks = data.data.map((task: Task) => ({
            ...task,
            limitDate: formatDate(task.limitDate),
          }))
          dispatch({ type: "FETCH_SUCCESS", payload: formattedTasks })
        } else {
          dispatch({ type: "FETCH_ERROR", payload: "Dados inválidos" })
        }
      } catch (error: any) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message || "Erro desconhecido",
        })
      }
    }

    fetchTasks()
  }, [])

  return state
}
