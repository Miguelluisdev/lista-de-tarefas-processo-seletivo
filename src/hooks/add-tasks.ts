import { useState } from "react"
import { toast } from "sonner"

export const useAddTask = (onClose: () => void) => {
  const [name, setName] = useState("")
  const [cost, setCost] = useState<number | "">("")
  const [limitDate, setLimitDate] = useState<string>("")
  const [errors, setErrors] = useState<{
    name?: string
    cost?: string
    limitDate?: string
  }>({})

  const validateForm = () => {
    const newErrors: { name?: string; cost?: string; limitDate?: string } = {}
    if (!name) newErrors.name = "Por favor, insira o nome da tarefa."
    if (!cost || cost <= 0)
      newErrors.cost = "Por favor, insira o custo da tarefa."
    if (!limitDate) newErrors.limitDate = "Por favor, insira a data limite."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const taskData = { name, cost, limitDate }

      try {
        const response = await fetch("https://backend-oyy1.onrender.com/create-tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        })

        if (!response.ok) {
          throw new Error("Erro ao criar a tarefa")
        }

        const data = await response.json()
        toast("Tarefa criada com sucesso! Atualize a página.")

        setName("")
        setCost("")
        setLimitDate("")
        onClose()
      } catch (error) {
        console.error("Erro:", error)
        toast("Erro ao criar a tarefa.")
      }
    }
  }

  return {
    name,
    cost,
    limitDate,
    errors,
    setName,
    setCost,
    setLimitDate,
    handleSubmit,
  }
}
