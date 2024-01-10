/*
  Warnings:

  - You are about to drop the `dashboards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "dashboards";

-- CreateTable
CREATE TABLE "Dashboards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "category" "Category" NOT NULL DEFAULT 'Misc',
    "dateFilter_name" TEXT NOT NULL DEFAULT '',
    "dateFilter_initialDateRange" "DateRange" NOT NULL DEFAULT 'LAST_30_DAYS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dashboards_pkey" PRIMARY KEY ("id")
);
