import createApiInstance from "../utils/axios.instance";
import { userAtom } from "../store/authStore";
import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

interface TransferModalProps {
  isOpen: boolean;
  onClose: (new_balance: number) => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");

  const [user] = useAtom(userAtom);
  const api = createApiInstance({ token: user?.access_token as string });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await api.post(`/transactions/transfer`, {
        amount: +amount,
        destinationAccountId: +accountId,
      });
      onClose(res?.data?.new_balance);
    } catch (e) {
      toast.error((e as any)?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => onClose(-1)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Transfer Money
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="accountId"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Recipient Account ID
                    </label>
                    <input
                      type="number"
                      id="accountId"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 
                        text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 
                        focus:ring-offset-2 transition-all duration-200 ease-in-out
                        placeholder:text-gray-400 hover:bg-gray-100
                        shadow-sm sm:text-sm"
                      placeholder="Enter account ID (e.g., 100)"
                      required
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      autoFocus
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 
                        text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 
                        focus:ring-offset-2 transition-all duration-200 ease-in-out
                        placeholder:text-gray-400 hover:bg-gray-100
                        shadow-sm sm:text-sm"
                      placeholder="Enter amount (e.g., 100.00)"
                      required
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      autoFocus
                    />
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => onClose(-1)}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Transfer
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransferModal;
