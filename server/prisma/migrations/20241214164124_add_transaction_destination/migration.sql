-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "destinationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
