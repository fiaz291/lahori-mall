-- DropIndex
DROP INDEX "Admin_username_key";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "username" DROP NOT NULL;
