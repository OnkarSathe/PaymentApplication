import { useState , useEffect } from "react";
import axios from "axios";

import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  const [balance, setbalance] = useState("");

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        config
      );
      console.log(response.data.balance);
      setbalance(response.data.balance);
    } catch (error) {
      // Handle errors here
    }
  };

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};
