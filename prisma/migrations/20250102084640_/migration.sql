/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `FinancialTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the `_ProductSubCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductSubCategories" DROP CONSTRAINT "_ProductSubCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSubCategories" DROP CONSTRAINT "_ProductSubCategories_B_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "FinancialTransaction" DROP COLUMN "vendorId",
ADD COLUMN     "storeId" INTEGER;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "vendorId",
ADD COLUMN     "storeId" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "vendorId",
ADD COLUMN     "storeId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "vendorId",
ADD COLUMN     "subCategoryId" INTEGER;

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "vendorId",
ADD COLUMN     "storeId" INTEGER;

-- DropTable
DROP TABLE "_ProductSubCategories";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialTransaction" ADD CONSTRAINT "FinancialTransaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
