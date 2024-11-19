"use client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { formatCost } from "../lib/format-cost"
import { formatDate } from "../lib/format-date"

export const useEditTask = (onClose: () => void) => {
  const [name, setName] = useState("")
  const [cost, setCost] = useState<number | "">("")
  const [limitDate, setLimitDate] = useState<string>("")
  const [errors, setErrors] = useState<{
    name?: string
    cost?: string
    limitDate?: string
  }>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const setData = (task: { name: string; cost: number; limitDate: string }) => {
    setName(task.name)
    setCost(task.cost)

    const formattedDate = task.limitDate.split("T")[0]
    setLimitDate(formattedDate)
  }

  const validateForm = () => {
    const newErrors: { name?: string; cost?: string; limitDate?: string } = {}
    if (!name) newErrors.name = "Por favor, insira o nome da tarefa."
    if (!cost || cost <= 0) {
      newErrors.cost = "Por favor, insira o custo da tarefa."
    } else {
      try {
        formatCost(cost)
      } catch (error: any) {
        newErrors.cost = error.message
      }
    }
    if (!limitDate) {
      newErrors.limitDate = "Por favor , insira a data limite"
    } else {
      try {
        formatDate(limitDate)
      } catch (error: any) {
        newErrors.limitDate = error.message
      }
    }
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    setIsFormValid(validateForm())
  }, [name, cost, limitDate])

  const editTask = async (taskId: number) => {
    if (!validateForm()) return false

    const taskData = { name, cost, limitDate }

    try {
      const response = await fetch(
        `https://backend-oyy1.onrender.com/upload/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        },
      )

      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa")
      }

      toast("Tarefa atualizada com sucesso! Atualize a página")

      setName("")
      setCost("")
      setLimitDate("")
      onClose()
      return true
    } catch (error) {
      console.error("Erro:", error)
      toast("Erro ao atualizar a tarefa.")
      return false
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
    setData,
    editTask,
    isFormValid,
  }
}
