export const formatCost = (cost: string | number): string => {
  const numericCost =
    typeof cost === "string"
      ? parseFloat(cost.replace(",", ".").replace(".", "").replace(",", "."))
      : cost

  if (isNaN(numericCost) || numericCost < 0 || numericCost > 100000000) {
    throw new Error("O custo deve ser um número entre 0 e 1.000.000.")
  }

  return numericCost.toLocaleString("pt-BR")
}

// formata visualmente
export const formatVisualCost = (cost: string) => {
  const parsedCost = parseFloat(cost)
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parsedCost)
}
