-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "isDiscount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
