/*
  Warnings:

  - You are about to drop the column `redirectUrl` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `totalRecruitment` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `hashPass` on the `User` table. All the data in the column will be lost.
  - Added the required column `passHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "redirectUrl",
DROP COLUMN "isFeatured",
DROP COLUMN "jobType",
DROP COLUMN "totalRecruitment",
DROP COLUMN "skills";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashPass",
ADD COLUMN     "passHash" VARCHAR NOT NULL;
