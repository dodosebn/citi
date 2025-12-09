interface Transaction {
  id: string;
  user_id: string;
  type: "debit" | "credit";
  description: string;
  amount: number;
  date: string;
  reference?: string;
  status?: "completed" | "pending" | "failed";
  category?: string;
  recipient?: string;
  sender?: string;
}

interface PrintTransactionProps {
  transaction: Transaction;
  formatDate: (dateString: string) => string;
}
const PrintTransaction: React.FC<PrintTransactionProps>= ({transaction, formatDate}) => {
    const element = document.getElementById(`transaction-details-${transaction.id}`);
    if (!element) return null;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Transaction Receipt - ${transaction.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .receipt { border: 2px solid #000; padding: 20px; max-width: 400px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 20px; }
              .details { margin: 15px 0; }
              .row { display: flex; justify-content: space-between; margin: 8px 0; }
              .label { font-weight: bold; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
              @media print { 
                body { padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <h2>Transaction Receipt</h2>
                <p>Citibank Digital Banking</p>
              </div>
              <div class="details">
                <div class="row">
                  <span class="label">Transaction ID:</span>
                  <span>${transaction.id}</span>
                </div>
                <div class="row">
                  <span class="label">Date:</span>
                  <span>${formatDate(transaction.date)}</span>
                </div>
                <div class="row">
                  <span class="label">Type:</span>
                  <span>${transaction.type.toUpperCase()}</span>
                </div>
                <div class="row">
                  <span class="label">Amount:</span>
                  <span>$${transaction.amount.toFixed(2)}</span>
                </div>
                <div class="row">
                  <span class="label">Description:</span>
                  <span>${transaction.description}</span>
                </div>
                ${transaction.reference ? `<div class="row">
                  <span class="label">Reference:</span>
                  <span>${transaction.reference}</span>
                </div>` : ''}
                <div class="row">
                  <span class="label">Status:</span>
                  <span>${transaction.status || 'Completed'}</span>
                </div>
              </div>
              <div class="footer">
                <p>Thank you for banking with us!</p>
                <p>Generated on ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
    return null;
  };

export default PrintTransaction;