import { useState } from "react"
import { toast } from "sonner"



export const useEditTask = (onClose: () => void) => {
  const [name, setName] = useState("")
  const [cost, setCost] = useState<number | "">("")
  const [limitDate, setLimitDate] = useState<string>("")
  const [errors, setErrors] = useState<{
    name?: string
    cost?: string
    limitDate?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { name?: string; cost?: string; limitDate?: string } = {}
    if (!name) newErrors.name = "Por favor, insira o nome da tarefa."
    if (!cost || cost <= 0)
      newErrors.cost = "Por favor, insira um custo válido."
    if (!limitDate) newErrors.limitDate = "Por favor, insira a data limite."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const editTask = async (taskId: number) => {
    if (!validateForm()) return false

    setLoading(true)
    const taskData = { name, cost, limitDate }

    try {
      const response = await fetch(`http://localhost:8080/upload/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa")
      }

      toast("Tarefa atualizada com sucesso! Atualize a pagina")

      setName("")
      setCost("")
      setLimitDate("")
      onClose()
      return true
    } catch (error) {
      console.error("Erro:", error)
      toast("Erro ao atualizar a tarefa.")
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    name,
    cost,
    limitDate,
    errors,
    loading,
    setName,
    setCost,
    setLimitDate,
    editTask,
  }
}
