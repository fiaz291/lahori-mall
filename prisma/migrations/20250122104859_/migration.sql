/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Banner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "productId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Banner_productId_key" ON "Banner"("productId");

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
