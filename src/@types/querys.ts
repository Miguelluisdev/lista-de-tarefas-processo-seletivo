export interface Task {
  name: string
  cost: number
  limitDate: string
}

export type State = {
  task: Task | null
  loading: boolean
  error: string | null
}

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Task }
  | { type: "FETCH_ERROR"; payload: string }


  