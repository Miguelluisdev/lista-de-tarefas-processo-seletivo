"use client"

import { TaskIdProps } from "@/@types/task"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDeleteTask } from "@/hooks/delete-task"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function DeleteTaskDialog({ id }: TaskIdProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmationInput, setConfirmationInput] = useState("")
  const { deleteTask, loading } = useDeleteTask()

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmationInput.toLowerCase() === "sim") {
      const deleted = await deleteTask(id)
      if (deleted) setIsOpen(false)
    } else {
      toast("Usuário não deletado.")
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDelete}>
            <div className="py-4">
              <p>Digite "Sim" para confirmar a exclusão da tarefa.</p>
              <Input
                type="text"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Deletando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
