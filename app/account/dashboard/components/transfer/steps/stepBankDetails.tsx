import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RiFileCopy2Line } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";
import { StepBankDetailsProps } from "../type";

const StepBankDetails: React.FC<StepBankDetailsProps> = ({
  accountNumber,
  setAccountNumber,
  handlePaste,
  isCopied,
  query,
  handleSearch,
  handleCustomBankInput,
  banks,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedBank,
  setSelectedBank,
  dropdownRef,
  Banks,
  isVerifying,
  handleBankSelect
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">
          Account Number
        </label>
        <div className="flex border rounded-md overflow-hidden">
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="flex-grow px-4 py-3 outline-none"
            placeholder="Enter account number"
          />
          <button
            type="button"
            onClick={handlePaste}
            className={`px-4 ${isCopied ? "text-green-600" : "text-gray-600"}`}
          >
            {isCopied ? "Copied!" : <RiFileCopy2Line />}
          </button>
        </div>
      </div>

      <div ref={dropdownRef}>
        <label className="block text-sm font-semibold mb-2">Bank Name</label>
        <div className="relative">
          <div className="flex border rounded-xl px-4">
            <div className="mt-4">
              <TbHomeFilled className="text-gray-400 mr-2" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={handleCustomBankInput}
              onFocus={() =>
                query && banks.length > 0 && setIsDropdownOpen(true)
              }
              placeholder="Search or type bank name..."
              className="flex-grow py-3 outline-none"
            />
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={banks.length === 0}
            >
              <FaChevronDown className={isDropdownOpen ? "rotate-180" : ""} />
            </button>
          </div>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border rounded-md mt-2 max-h-60 overflow-y-auto shadow-lg">
              {banks.length > 0 ? (
                banks.map((b, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleBankSelect(b.NAME)}
                  >
                    {b.NAME}{" "}
                    <span className="text-sm text-gray-500">({b.REGION})</span>
                  </li>
                ))
              ) : (
                <li className="p-4 text-gray-400 text-center">
                  No banks found. You can type any bank name.
                </li>
              )}
            </ul>
          )}
        </div>
        {selectedBank && !Banks.some((bank) => bank.NAME === selectedBank) && (
          <p className="text-sm text-blue-600 mt-2">
            Using custom bank:{" "}
            <span className="font-semibold">{selectedBank}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!selectedBank || !accountNumber || isVerifying}
        className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isVerifying ? "Verifying..." : "Continue to Recipient Info"}
      </button>
    </>
  );
};

export default StepBankDetails;
