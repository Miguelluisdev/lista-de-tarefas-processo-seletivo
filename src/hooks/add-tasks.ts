import { useDeferredValue, useEffect, useReducer } from "react"
import { toast } from "sonner"
import { formatCost } from "../lib/format-cost"
import { formatDate } from "../lib/format-date"

type State = {
  name: string
  cost: number | ""
  limitDate: string
  errors: {
    name?: string
    cost?: string
    limitDate?: string
  }
  isFormValid: boolean
}

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_COST"; payload: number | "" }
  | { type: "SET_LIMIT_DATE"; payload: string }
  | { type: "SET_ERRORS"; payload: State["errors"] }
  | { type: "VALIDATE_FORM" }

const initialState: State = {
  name: "",
  cost: "",
  limitDate: "",
  errors: {},
  isFormValid: false,
}

const addTaskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload }
    case "SET_COST":
      return { ...state, cost: action.payload }
    case "SET_LIMIT_DATE":
      return { ...state, limitDate: action.payload }
    case "SET_ERRORS":
      return { ...state, errors: action.payload }
    case "VALIDATE_FORM":
      const errors: State["errors"] = {}
      if (!state.name) errors.name = "Por favor, insira o nome da tarefa."
      if (!state.cost || state.cost <= 0) {
        errors.cost = "Por favor, insira o custo da tarefa."
      } else {
        try {
          formatCost(state.cost)
        } catch (error: any) {
          errors.cost = error.message
        }
      }
      if (!state.limitDate) {
        errors.limitDate = "Por favor, insira a data limite."
      } else {
        try {
          formatDate(state.limitDate)
        } catch (error: any) {
          errors.limitDate = error.message
        }
      }
      return {
        ...state,
        errors,
        isFormValid: Object.keys(errors).length === 0,
      }
    default:
      return state
  }
}

export const useAddTask = (onClose: () => void) => {
  const [state, dispatch] = useReducer(addTaskReducer, initialState)

  const deferredErrors = useDeferredValue(state.errors)

  useEffect(() => {
    dispatch({ type: "VALIDATE_FORM" })
  }, [state.name, state.cost, state.limitDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: "VALIDATE_FORM" })

    if (state.isFormValid) {
      const taskData = {
        name: state.name,
        cost: state.cost,
        limitDate: state.limitDate,
      }

      try {
        const response = await fetch(
          "https://backend-oyy1.onrender.com/create-tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
          },
        )

        if (!response.ok) {
          throw new Error("Erro ao criar a tarefa")
        }

        const data = await response.json()
        toast("Tarefa criada com sucesso! Atualize a página.")

        dispatch({ type: "SET_NAME", payload: "" })
        dispatch({ type: "SET_COST", payload: "" })
        dispatch({ type: "SET_LIMIT_DATE", payload: "" })
        onClose()
      } catch (error) {
        console.error("Erro:", error)
        toast("Erro ao criar a tarefa.")
      }
    }
  }

  return {
    name: state.name,
    cost: state.cost,
    limitDate: state.limitDate,
    errors: deferredErrors,
    setName: (name: string) => dispatch({ type: "SET_NAME", payload: name }),
    setCost: (cost: number | "") =>
      dispatch({ type: "SET_COST", payload: cost }),
    setLimitDate: (date: string) =>
      dispatch({ type: "SET_LIMIT_DATE", payload: date }),
    handleSubmit,
    isFormValid: state.isFormValid,
  }
}
