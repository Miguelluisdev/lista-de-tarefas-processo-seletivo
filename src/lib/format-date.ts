import { format, isValid, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString)

  if (!isValid(date)) {
    throw new Error(
      "Data inválida. Por favor, forneça uma data válida no formato YYYY-MM-DD.",
    )
  }

  const year = date.getUTCFullYear()
  if (year !== 2024 && year !== 2025) {
    throw new Error("Só é permitido os anos 2024 e 2025.")
  }

  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}
