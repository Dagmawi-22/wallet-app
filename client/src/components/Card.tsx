import { motion } from "framer-motion";
interface CardProps {
  balance: number;
  fullName: string;
  cardNumber?: string;
}

export const Card = ({ balance, fullName, cardNumber = "4242" }: CardProps) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-700 to-indigo-900 rounded-xl p-8 text-white shadow-2xl"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20" />
      <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/20" />
    </div>

    <div className="absolute top-8 right-8">
      <div className="relative flex items-center gap-2">
        <div className="h-6 w-10 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400" />
        <svg className="h-8 w-8 opacity-80" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
          />
        </svg>
      </div>
    </div>

    <div className="h-full flex flex-col justify-between relative z-10">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-white/80">
          Current Balance
        </p>
        <motion.p
          className="text-5xl font-bold"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {balance}
        </motion.p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-12 rounded-md bg-white/20 backdrop-blur-sm" />
          <p className="text-lg font-medium tracking-widest">
            •••• •••• •••• {cardNumber}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium tracking-wider text-white/90">
            {fullName}
          </p>
          <svg className="h-10 w-10 opacity-80" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4"
            />
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
);
