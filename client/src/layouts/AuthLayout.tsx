import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  RiAddLine,
  RiSubtractLine,
  RiFileListLine,
  RiMenuLine,
  RiCloseLine,
  RiExchangeLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

import { useState } from "react";
import WithdrawModal from "../components/WithdrawalModal";
import DepositModal from "../components/DepositModal";
import TransferModal from "../components/TransferModal";
import { useAtom } from "jotai";
import { userAtom } from "../store/authStore";

const AuthLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const handleReload = (new_balance: number) => {
    if (user?.user?.account) {
      if (new_balance === -1) {
        navigate(0);
        return;
      }
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          account: {
            ...user.user.account,
            balance: new_balance,
          },
        },
      };
      setUser(updatedUser);
      navigate(0);
    }
  };

  const handleLogout = () => {
    setUser({
      access_token: null,
      user: null,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: "url('/dashboard-bg.jpg')",
        }}
      />
      <nav className="relative z-10 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 top-0 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/transactions" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  WalletApp
                </span>
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {isMenuOpen ? (
                  <RiCloseLine className="h-6 w-6" />
                ) : (
                  <RiMenuLine className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className="hidden md:flex space-x-1">
              <Link
                to="/transactions"
                className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
              >
                <RiFileListLine className="w-4 h-4 mr-2" />
                Transactions
              </Link>
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
              >
                <RiAddLine className="w-4 h-4 mr-2" />
                Withdraw
              </button>
              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
              >
                <RiSubtractLine className="w-4 h-4 mr-2" />
                Deposit
              </button>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
              >
                <RiExchangeLine className="w-4 h-4 mr-2" />
                Transfer
              </button>
            </div>
            <div className="hidden md:flex space-x-1">
              {/* ... existing menu items ... */}
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
              >
                <RiLogoutBoxLine className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          <div
            className={`md:hidden ${
              isMenuOpen ? "block" : "hidden"
            } pb-3 space-y-1`}
          >
            <Link
              to="/transactions"
              className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
            >
              <RiFileListLine className="w-4 h-4 mr-2" />
              Transactions
            </Link>
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
            >
              <RiAddLine className="w-4 h-4 mr-2" />
              Withdraw
            </button>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
            >
              <RiSubtractLine className="w-4 h-4 mr-2" />
              Deposit
            </button>
            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="text-gray-700 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center"
            >
              <RiExchangeLine className="w-4 h-4 mr-2" />
              Transfer
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out flex items-center w-full"
            >
              <RiLogoutBoxLine className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 ring-1 ring-gray-200/50">
            <Outlet />
          </div>
        </div>
      </main>
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={handleReload} />
      <DepositModal isOpen={isDepositModalOpen} onClose={handleReload} />
      <TransferModal isOpen={isTransferModalOpen} onClose={handleReload} />
    </div>
  );
};

export default AuthLayout;
