export interface Task {
  id: number
  name: string
  cost: number
  limitDate: string
  order: number
}
export interface AddTaskDialogProps {
  isOpen: boolean
  onClose: () => void
}

export interface EditTaskDialogProps {
  isOpen: boolean
  onClose: () => void
}
export interface TaskIdProps {
  id: number
}
