"use client"
import { AddTaskDialogProps } from "@/@types/task"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAddTask } from "@/hooks/add-tasks"

export function AddTaskDialog({ isOpen, onClose }: AddTaskDialogProps) {
  const {
    name,
    cost,
    limitDate,
    errors,
    setName,
    setCost,
    setLimitDate,
    handleSubmit,
    isFormValid,
  } = useAddTask(onClose)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-name" className="text-right">
                Nome
              </label>
              <div className="col-span-3">
                <Input
                  id="new-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-cost" className="text-right">
                Custo
              </label>
              <div className="col-span-3">
                <Input
                  type="number"
                  id="new-cost"
                  value={cost}
                  onChange={(e) =>
                    setCost(e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
                {errors.cost && (
                  <span className="text-red-500 text-sm">{errors.cost}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-limitDate" className="text-right">
                Data Limite
              </label>
              <div className="col-span-3">
                <Input
                  type="date"
                  id="new-limitDate"
                  value={limitDate}
                  onChange={(e) => setLimitDate(e.target.value)}
                />
                {errors.limitDate && (
                  <span className="text-red-500 text-sm">
                    {errors.limitDate}
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isFormValid}>
              Adicionar Tarefa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
