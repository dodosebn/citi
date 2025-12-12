"use client";
import React from 'react';

interface TransferEmailProps {
  type: "sender" | "recipient";
  details: {
    amount: number;
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
    bank: string;
    accountNumber: string;
    transactionId: string;
    date: string;
    description: string;
    newBalance?: number;
  };
}

export const TransferEmailTemplate: React.FC<TransferEmailProps> = ({ 
  type, 
  details 
}) => {
  const isSender = type === "sender";
  
  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    lineHeight: 1.6,
    color: '#333',
    padding: '10px',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e5e7eb',
  };

  const logoStyle: React.CSSProperties = {
    height: '80px',
    marginBottom: '15px',
  };

  const receiptContainerStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  };

  const amountDisplayStyle: React.CSSProperties = {
    textAlign: 'center',
    margin: '25px 0',
    padding: '20px',
    background: isSender ? '#fee2e2' : '#dcfce7',
    borderRadius: '10px',
    border: `2px solid ${isSender ? '#fecaca' : '#bbf7d0'}`,
  };

  const amountTextStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: isSender ? '#dc2626' : '#16a34a',
    margin: '5px 0',
  };

  const detailRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
  };

  const detailLabelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: '#6b7280',
    minWidth: '180px',
  };

  const detailValueStyle: React.CSSProperties = {
    fontWeight: 500,
    color: '#111827',
    textAlign: 'right' as const,
  };

  const statusBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#d1fae5',
    color: '#065f46',
  };

  const footerStyle: React.CSSProperties = {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '2px solid #e5e7eb',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
  };

  const transactionIdStyle: React.CSSProperties = {
    fontFamily: "'Courier New', monospace",
    background: '#f9fafb',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#374151',
    display: 'inline-block',
  };

  const noteBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '15px',
    margin: '20px 0',
    borderRadius: '6px',
  };

  const greetingStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#4b5563',
    marginBottom: '20px',
  };

  const bankInfoStyle: React.CSSProperties = {
    background: '#f8fafc',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0',
    border: '1px solid #e2e8f0',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <img 
          src="https://citi-zeta.vercel.app/images/logo.png" 
          alt="Bank Logo" 
          style={logoStyle}
        />
        <h2 style={{ color: '#1e40af', margin: '10px 0', fontSize: '24px' }}>
          {isSender ? 'Transfer Successful!' : 'Money Received!'}
        </h2>
      </div>

      <div style={receiptContainerStyle}>
        <p style={greetingStyle}>
          Dear {isSender ? details.senderName : details.recipientName},
        </p>
        
        <div style={amountDisplayStyle}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>
            {isSender ? 'Amount Transferred' : 'Amount Received'}
          </div>
          <div style={amountTextStyle}>
            {isSender ? '−' : '+'}${details.amount.toFixed(2)}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '5px' }}>
            {isSender ? 'Debit Transaction' : 'Credit Transaction'}
          </div>
        </div>

        <div style={bankInfoStyle}>
          <h3 style={{ color: '#1e40af', marginTop: '0', marginBottom: '15px' }}>
            {isSender ? 'Recipient Details' : 'Sender Details'}
          </h3>
          <div>
            <div style={detailRowStyle}>
              <span style={detailLabelStyle}>
                {isSender ? 'Recipient:' : 'Sender:'}
              </span>
              <span style={detailValueStyle}>
                {isSender ? details.recipientName : details.senderName}
              </span>
            </div>
            <div style={detailRowStyle}>
              <span style={detailLabelStyle}>Bank:</span>
              <span style={detailValueStyle}>{details.bank}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={detailLabelStyle}>Account Number:</span>
              <span style={detailValueStyle}>{details.accountNumber}</span>
            </div>
          </div>
        </div>

        <div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Transaction ID:</span>
            <span style={transactionIdStyle}>{details.transactionId}</span>
          </div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Date & Time:</span>
            <span style={detailValueStyle}>{formatDate(details.date)}</span>
          </div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Description:</span>
            <span style={detailValueStyle}>{details.description || "Bank Transfer"}</span>
          </div>
          {details.newBalance && (
            <div style={detailRowStyle}>
              <span style={detailLabelStyle}>Your New Balance:</span>
              <span style={{ ...detailValueStyle, color: '#16a34a', fontWeight: 700 }}>
                ${details.newBalance.toFixed(2)}
              </span>
            </div>
          )}
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Status:</span>
            <span style={statusBadgeStyle}>Completed</span>
          </div>
        </div>

        <div style={noteBoxStyle}>
          <strong>Note:</strong>{' '}
          {isSender 
            ? "The recipient should receive the funds within 1-2 business days. You'll receive another notification once the transfer is fully processed."
            : "The funds should reflect in your account shortly. If you don't see the amount within 24 hours, please contact our support team."}
        </div>

        <div style={footerStyle}>
          <p style={{ marginBottom: '5px' }}>Thank you for banking with us!</p>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            This is an automated message. Please do not reply to this email.<br />
            Generated on {new Date().toLocaleString()}
          </p>
<p style={{ fontSize: '12px', color: '#9ca3af' }}>
  94050 Southwest Germini Drive
  Beaverton, Oregon 97008, U.S.A
</p>
        </div>
      </div>
    </div>
  );
};