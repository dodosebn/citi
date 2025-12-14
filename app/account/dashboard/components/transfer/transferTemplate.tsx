"use client";
import React from "react";

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
    swiftCode: string;
    routingNumber: string;
  };
}

export const TransferEmailTemplate: React.FC<TransferEmailProps> = ({
  type,
  details,
}) => {
  const isSender = type === "sender";

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#111827",
    padding: "12px",
    backgroundColor: "#f9fafb",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e7eb",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    paddingBottom: "16px",
    borderBottom: "2px solid #e5e7eb",
    marginBottom: "20px",
  };

  const amountBoxStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "18px",
    margin: "20px 0",
    borderRadius: "10px",
    backgroundColor: isSender ? "#fee2e2" : "#dcfce7",
    border: `2px solid ${isSender ? "#fecaca" : "#bbf7d0"}`,
  };

  const amountTextStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    color: isSender ? "#dc2626" : "#16a34a",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const labelCellStyle: React.CSSProperties = {
    padding: "10px 0",
    fontWeight: 600,
    color: "#6b7280",
    verticalAlign: "top",
    width: "40%",
  };

  const valueCellStyle: React.CSSProperties = {
    padding: "10px 0",
    color: "#111827",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1e40af",
    margin: "20px 0 10px",
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    fontWeight: 600,
    fontSize: "13px",
  };

  const footerStyle: React.CSSProperties = {
    marginTop: "30px",
    paddingTop: "16px",
    borderTop: "2px solid #e5e7eb",
    textAlign: "center",
    fontSize: "12px",
    color: "#6b7280",
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <img
            src="https://citi-zeta.vercel.app/images/logo.png"
            alt="Bank Logo"
            style={{ height: "70px", marginBottom: "10px" }}
          />
          <h2 style={{ margin: 0, color: "#1e40af" }}>
            {isSender ? "Transfer Successful" : "Money Received"}
          </h2>
        </div>

        {/* Greeting */}
        <p>
          Dear {isSender ? details.senderName : details.recipientName},
        </p>

        {/* Amount */}
        <div style={amountBoxStyle}>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            {isSender ? "Amount Transferred" : "Amount Received"}
          </div>
          <div style={amountTextStyle}>
            {isSender ? "−" : "+"}${details.amount.toFixed(2)}
          </div>
        </div>

        {/* Bank Details */}
        <div>
          <div style={sectionTitleStyle}>
            {isSender ? "Recipient Details" : "Sender Details"}
          </div>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={labelCellStyle}>
                  {isSender ? "Recipient" : "Sender"}
                </td>
                <td style={valueCellStyle}>
                  {isSender ? details.recipientName : details.senderName}
                </td>
              </tr>
              <tr>
                <td style={labelCellStyle}>Bank</td>
                <td style={valueCellStyle}>{details.bank}</td>
              </tr>
              <tr>
                <td style={labelCellStyle}>Account Number</td>
                <td style={valueCellStyle}>{details.accountNumber}</td>
              </tr>
              <tr>
                <td style={labelCellStyle}>Swift Code</td>
                <td style={valueCellStyle}>{details.swiftCode || "—"}</td>
              </tr>
              <tr>
                <td style={labelCellStyle}>Routing Number</td>
                <td style={valueCellStyle}>{details.routingNumber || "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Transaction Info */}
        <div>
          <div style={sectionTitleStyle}>Transaction Information</div>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={labelCellStyle}>Transaction ID</td>
                <td style={valueCellStyle}>{details.transactionId}</td>
              </tr>
              <tr>
                <td style={labelCellStyle}>Date & Time</td>
                <td style={valueCellStyle}>{formatDate(details.date)}</td>
              </tr>
              <tr>
                <td style={labelCellStyle}>Description</td>
                <td style={valueCellStyle}>
                  {details.description || "Bank Transfer"}
                </td>
              </tr>
              {details.newBalance !== undefined && (
                <tr>
                  <td style={labelCellStyle}>New Balance</td>
                  <td
                    style={{
                      ...valueCellStyle,
                      fontWeight: "bold",
                      color: "#16a34a",
                    }}
                  >
                    ${details.newBalance.toFixed(2)}
                  </td>
                </tr>
              )}
              <tr>
                <td style={labelCellStyle}>Status</td>
                <td style={valueCellStyle}>
                  <span style={badgeStyle}>Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <p>Thank you for banking with us.</p>
          <p>
            This is an automated message. Please do not reply.<br />
            Generated on {new Date().toLocaleString()}
          </p>
          <p>
            94050 Southwest Germini Drive<br />
            Beaverton, Oregon 97008, U.S.A
          </p>
        </div>
      </div>
    </div>
  );
};
