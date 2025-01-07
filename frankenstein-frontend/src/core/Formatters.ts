export const formatPhoneNumber = (phone: string): string => {
  // Remove todos os caracteres que não são números
  const cleaned = phone.replace(/\D/g, "");

  // Verifica se é um número de 10 ou 11 dígitos
  if (cleaned.length === 10) {
    // Formato para números com 10 dígitos: (XX) XXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (cleaned.length === 11) {
    // Formato para números com 11 dígitos: (XX) 9XXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2$3-$4");
  } else {
    // Retorna o número original caso não seja válido
    return phone;
  }
};
