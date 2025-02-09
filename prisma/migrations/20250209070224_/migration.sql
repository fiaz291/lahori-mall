/*
  Warnings:

  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_productId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userId_fkey";

-- DropTable
DROP TABLE "View";

-- CreateTable
CREATE TABLE "Views" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Views_userId_viewedAt_idx" ON "Views"("userId", "viewedAt");

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
