export type State = {
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

export type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_COST"; payload: number | "" }
  | { type: "SET_LIMIT_DATE"; payload: string }
  | { type: "SET_ERRORS"; payload: State["errors"] }
  | { type: "VALIDATE_FORM" }

export const initialState: State = {
  name: "",
  cost: "",
  limitDate: "",
  errors: {},
  isFormValid: false,
}
