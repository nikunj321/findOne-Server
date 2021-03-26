-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
