export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "";

  if (phoneNumber.length === 11) {
    // Formato para celular (11 dígitos): (99) 99999-9999
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      7
    )}-${phoneNumber.slice(7)}`;
  } else if (phoneNumber.length === 10) {
    // Formato para telefone fixo (10 dígitos): (99) 9999-9999
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      6
    )}-${phoneNumber.slice(6)}`;
  } else {
    // Retorna o número original se não tiver 10 ou 11 dígitos
    return phoneNumber;
  }
}
