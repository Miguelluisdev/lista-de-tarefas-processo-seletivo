"use client"
import SkeletonLoader from "@/components/skeleton-loader"
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
import { formatVisualCost } from "@/lib/format-cost"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Suspense, useState } from "react"
import { AddTaskDialog } from "../components/add-task-dialog"
import { DeleteTaskDialog } from "../components/delete-task-dialog"
import { EditTaskDialog } from "../components/edit-task-dialog"

export default function TaskTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { tasks, error } = useTasks()

  const { localTasks, handleMoveUp, handleMoveDown, setLocalTasks } =
    useTaskReorder(tasks)

  return (
    <div className="container  mx-auto p-4">
      <h1 className="text-5xl pt-10 font-bold text-center mb-6">
        Lista de Tarefas
      </h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <Button className="mb-4" onClick={() => setIsAddModalOpen(true)}>
        Adicionar task
      </Button>
      <Suspense fallback={SkeletonLoader({ rows: 5, columns: 10 })}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identificador</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Custo</TableHead>
              <TableHead>Data Limite</TableHead>
              <TableHead className="text-right">Reordenar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localTasks.length > 0 ? (
              localTasks.map((task: any, index: any) => {
                return (
                  <TableRow
                    key={task.id}
                    className={task.cost >= 1000 ? "bg-yellow-400" : ""}
                  >
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.name}</TableCell>
                    <TableCell
                      className={task.cost >= 1000 ? "text-red-700" : ""}
                    >
                      {formatVisualCost(task.cost)}
                    </TableCell>
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
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhuma tarefa disponível
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Suspense>
      <AddTaskDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}
