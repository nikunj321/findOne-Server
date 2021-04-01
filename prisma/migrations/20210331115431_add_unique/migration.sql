/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `Company`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company.email_unique" ON "Company"("email");
