-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company.id_unique" ON "Company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Company.email_unique" ON "Company"("email");
