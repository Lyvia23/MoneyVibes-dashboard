  export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };


 