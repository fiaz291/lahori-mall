-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "verificationCode" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "socialToken" TEXT;
