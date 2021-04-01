-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "redirectUrl" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "totalRecruitment" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "skills" TEXT[];

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashPass" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
