import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SuccessAnimation = () => (
  <div className="flex justify-center mt-60">
    <div className="flex flex-col justify-center">
      <div className="w-16 h-16 ml-12 flex items-center justify-center rounded-full bg-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white w-10 h-10"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.26 7.64l-5.46 5.45c-.2.2-.51.2-.71 0L5.71 9.4c-.2-.2-.2-.51 0-.71s.51-.2.71 0L9 11.77l4.54-4.54c.2-.2.51-.2.71 0s.19.51 0 .71z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="text-green font-bold">Transaction Successful</div>
    </div>
  </div>
);

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [isTransferSuccess, setIsTransferSuccess] = useState(false);

  const transferApi = () => {
    try {
      axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setIsTransferSuccess(true);
    } catch {
      setMessage("Failed to send money");
    }
  };

  return (
    <div>
      {isTransferSuccess ? (
        <SuccessAnimation />
      ) : (
        <div class="flex justify-center h-screen bg-gray-100">
          <div className="h-full flex flex-col justify-center">
            <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
              <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
              </div>
              <div class="p-6">
                <div class="flex items-center space-x-4 mb-12">
                  <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">
                      {name[0].toUpperCase()}
                    </span>
                  </div>
                  <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                  <div class="space-y-2">
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="amount"
                    >
                      Amount (in Rs)
                    </label>
                    <input
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      type="number"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                    />
                  </div>
                  <button
                    onClick={transferApi}
                    class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                  >
                    Initiate Transfer
                  </button>
                  <div>{message}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
