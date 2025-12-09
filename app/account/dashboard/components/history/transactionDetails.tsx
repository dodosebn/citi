import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Copy, Download, Printer, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import PrintTransaction from "./printTransaction";

export interface Transaction {
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

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const shareToWhatsApp = () => {
    const message = 
      `💰 Transaction Details\n\n` +
      `Type: ${transaction.type === 'debit' ? 'Debit' : 'Credit'}\n` +
      `Amount: $${transaction.amount.toFixed(2)}\n` +
      `Description: ${transaction.description}\n` +
      `Date: ${formatDate(transaction.date)}\n` +
      `Status: ${transaction.status || 'Completed'}\n` +
      `${transaction.reference ? `Reference: ${transaction.reference}\n` : ''}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const copyToClipboard = () => {
    const text = 
      `Transaction ID: ${transaction.id}\n` +
      `Amount: $${transaction.amount.toFixed(2)}\n` +
      `Type: ${transaction.type}\n` +
      `Date: ${formatDate(transaction.date)}\n` +
      `Description: ${transaction.description}\n` +
      `Status: ${transaction.status || 'completed'}\n` +
      `Reference: ${transaction.reference || 'N/A'}`;
    
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Transaction details copied!"))
      .catch(() => toast.error("Failed to copy"));
  };

  const downloadAsPDF = async () => {
    const element = document.getElementById(`transaction-details-${transaction.id}`);
    if (!element) return;

    toast.info("Generating PDF...", { autoClose: 2000 });

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`transaction-${transaction.id}-${new Date().getTime()}.pdf`);
      
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  };

  const printTransaction = () => {
    const element = document.getElementById(`transaction-details-${transaction.id}`);
    if (!element) return;

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
  };

  return (
    <>
      {/* Hidden element for PDF generation */}
      <div id={`transaction-details-${transaction.id}`} className="hidden">
        <div className="p-6 max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Transaction Receipt</h2>
            <p className="text-gray-600">Citibank Digital Banking</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">Transaction ID:</span>
              <span className="text-sm">{transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Date:</span>
              <span>{formatDate(transaction.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Type:</span>
              <span className={`font-bold ${transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.type.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Amount:</span>
              <span className="text-xl font-bold">${transaction.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Description:</span>
              <span>{transaction.description}</span>
            </div>
            {transaction.reference && (
              <div className="flex justify-between">
                <span className="font-semibold">Reference:</span>
                <span>{transaction.reference}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                {transaction.status || 'Completed'}
              </span>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-gray-500 text-sm">
            <p>Thank you for banking with us!</p>
            <p>Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
<PrintTransaction transaction={transaction} formatDate={formatDate} />
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Transaction Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                transaction.type === 'debit' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'debit' ? '-' : '+'}${transaction.amount.toFixed(2)}
                </span>
              </div>
              <h2 className="text-xl font-bold">{transaction.description}</h2>
              <p className="text-gray-600 text-sm mt-1">{formatDate(transaction.date)}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Transaction ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{transaction.id.slice(0, 8)}...</span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Copy ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-semibold capitalize">{transaction.type}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status || 'Completed'}
                  </span>
                </div>
              </div>

              {transaction.reference && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Reference</p>
                  <p className="font-semibold">{transaction.reference}</p>
                </div>
              )}

              {transaction.recipient && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Recipient</p>
                  <p className="font-semibold">{transaction.recipient}</p>
                </div>
              )}

              {transaction.sender && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Sender</p>
                  <p className="font-semibold">{transaction.sender}</p>
                </div>
              )}

              {transaction.category && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold capitalize">{transaction.category}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={shareToWhatsApp}
                className="flex flex-col items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
                title="Share via WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5 mb-1" />
                <span className="text-xs">WhatsApp</span>
              </button>

              <button
                onClick={downloadAsPDF}
                className="flex flex-col items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                title="Download PDF"
              >
                <Download className="w-5 h-5 mb-1" />
                <span className="text-xs">PDF</span>
              </button>

              <button
                onClick={printTransaction}
                className="flex flex-col items-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition"
                title="Print Receipt"
              >
                <Printer className="w-5 h-5 mb-1" />
                <span className="text-xs">Print</span>
              </button>

              <button
                onClick={copyToClipboard}
                className="flex flex-col items-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                title="Copy Details"
              >
                <Copy className="w-5 h-5 mb-1" />
                <span className="text-xs">Copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
