-- CreateEnum
CREATE TYPE "DateRange" AS ENUM ('LAST_90_DAYS', 'LAST_30_DAYS', 'CURRENT_MONTH');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('User', 'Financial', 'Marketing', 'Business', 'Support', 'Misc');

-- CreateTable
CREATE TABLE "dashboards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "category" "Category" NOT NULL DEFAULT 'Misc',
    "dateFilter_name" TEXT NOT NULL DEFAULT '',
    "dateFilter_initialDateRange" "DateRange" NOT NULL DEFAULT 'LAST_30_DAYS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboards_pkey" PRIMARY KEY ("id")
);
