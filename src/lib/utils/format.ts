
/**
 * Formatea un número como moneda argentina
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formatea una fecha en formato español
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-ES")
}
