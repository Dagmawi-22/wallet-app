import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { userAtom } from "../../store/authStore";
import createApiInstance from "../../utils/axios.instance";
import { Card } from "../../components/Card";
import { Transaction } from "@/types/types";

const Transactions = () => {
  const [user] = useAtom(userAtom);
  const observerTarget = useRef(null);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: async ({ pageParam = 1 }) => {
      if (!user?.access_token) {
        throw new Error("User not authenticated");
      }
      const api = createApiInstance({ token: user.access_token });
      const { data } = await api.get(`/transactions`, {
        params: { page: pageParam },
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    enabled: !!user?.access_token, 
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card
        balance={user?.user?.account?.balance as number}
        fullName={user?.user?.fullName as string}
        cardNumber="2222"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Transactions</h2>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {data?.pages.map((page, i) => (
              <div key={i} className="space-y-4">
                {page.data.map((transaction: Transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full ${
                          transaction.type === "DEPOSIT"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <svg
                          className={`h-6 w-6 ${
                            transaction.type === "DEPOSIT"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          {transaction.type === "DEPOSIT" ? (
                            <path
                              fill="currentColor"
                              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M16,10V12H8V10H16M16,14V16H8V14H16Z"
                            />
                          ) : (
                            <path
                              fill="currentColor"
                              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M16,10V12H12V16H10V12H6V10H10V6H12V10H16Z"
                            />
                          )}
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(transaction.createdAt),
                            "MMM dd, yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-bold ${
                        transaction.type === "DEPOSIT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "DEPOSIT" ? "+" : "-"}$
                      {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            ))}
            <div ref={observerTarget} className="h-4" />
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
