import { useState } from "react"
import { toast } from "sonner"

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false)

  const deleteTask = async (taskId: number) => {
    setLoading(true)
    try {
      const response = await fetch(`https://backend-oyy1.onrender.com/delete/${taskId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao deletar a tarefa")
      }

      toast("Tarefa deletada com sucesso! atualizar a pagina")
      return true
    } catch (error) {
      console.error("Erro:", error)
      toast("Erro ao deletar a tarefa.")
      return false
    } finally {
      setLoading(false)
    }
  }

  return { deleteTask, loading }
}
