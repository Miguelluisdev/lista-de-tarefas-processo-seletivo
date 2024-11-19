import { Action, State } from "@/@types/querys"
import { useEffect, useReducer } from "react"

export const initialState: State = {
  task: null,
  loading: true,
  error: null,
}

const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, task: action.payload }
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload }
    default:
      throw new Error(`Unhandled action type`)
  }
}

const useFetchTaskById = (taskId: number) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    const fetchTask = async () => {
      dispatch({ type: "FETCH_START" })
      try {
        const response = await fetch(`https://backend-oyy1.onrender.com/tasks/${taskId}`)
        if (!response.ok) {
          throw new Error("Tarefa não encontrada")
        }
        const data = await response.json()
        dispatch({ type: "FETCH_SUCCESS", payload: data.task })
      } catch (err: any) {
        dispatch({
          type: "FETCH_ERROR",
          payload: err.message || "Erro ao carregar tarefa",
        })
      }
    }

    fetchTask()
  }, [taskId])

  return state
}

export default useFetchTaskById
