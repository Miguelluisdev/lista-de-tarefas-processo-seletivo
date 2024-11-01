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
import { useEditTask } from "@/hooks/edit-tasks"
import { Edit } from "lucide-react"
import { useState } from "react"

export function EditTaskDialog({ id }: TaskIdProps) {
  const [isOpen, setIsOpen] = useState(false)

  const {
    name,
    cost,
    limitDate,
    errors,
    loading,
    setName,
    setCost,
    setLimitDate,
    editTask,
  } = useEditTask(() => setIsOpen(false))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await editTask(id)
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
        <Edit className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarefa</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nome
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="cost" className="text-right">
                  Custo
                </label>
                <Input
                  id="cost"
                  type="number"
                  value={cost}
                  onChange={(e) =>
                    setCost(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="col-span-3"
                />
                {errors.cost && (
                  <span className="text-red-500 text-sm">{errors.cost}</span>
                )}    
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="limitDate" className="text-right">
                  Data limite
                </label>
                <Input
                  id="limitDate"
                  type="date"
                  value={limitDate}
                  onChange={(e) => setLimitDate(e.target.value)}
                  className="col-span-3"
                />
                {errors.limitDate && (
                  <span className="text-red-500 text-sm">
                    {errors.limitDate}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}