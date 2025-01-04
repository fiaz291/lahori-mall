/*
  Warnings:

  - The `profilePicture` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `profilePicture` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "profilePicture",
ADD COLUMN     "profilePicture" JSONB;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicture",
ADD COLUMN     "profilePicture" JSONB;
