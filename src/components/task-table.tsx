"use client"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTasks } from "@/hooks/get-taks"
import { useTaskReorder } from "@/hooks/task-order"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { AddTaskDialog } from "./add-task-dialog"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { EditTaskDialog } from "./edit-task-dialog"

export default function TaskTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { tasks, error } = useTasks()

  const { localTasks, handleMoveUp, handleMoveDown, setLocalTasks } =
    useTaskReorder(tasks)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Tarefas</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <Button className="mb-4" onClick={() => setIsAddModalOpen(true)}>
        Adicionar task
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Custo</TableHead>
            <TableHead>Data Limite</TableHead>
            <TableHead className="text-right">Reordenar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localTasks.length > 0 ? (
            localTasks.map((task: any, index: any) => (
              <TableRow
                key={task.id}
                className={task.cost >= 1000 ? "bg-yellow-400" : ""}
              >
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.cost}</TableCell>
                <TableCell>{task.limitDate}</TableCell>
                <TableCell className="text-right">
                  <EditTaskDialog id={task.id} />
                  <DeleteTaskDialog id={task.id} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveUp(index)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveDown(index)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhuma tarefa disponível
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddTaskDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}
