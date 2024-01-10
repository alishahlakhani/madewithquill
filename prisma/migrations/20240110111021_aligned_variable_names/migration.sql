/*
  Warnings:

  - You are about to drop the column `dateField_field` on the `Charts` table. All the data in the column will be lost.
  - You are about to drop the column `dateField_table` on the `Charts` table. All the data in the column will be lost.
  - You are about to drop the column `dateFilter_initialDateRange` on the `Dashboards` table. All the data in the column will be lost.
  - You are about to drop the column `dateFilter_name` on the `Dashboards` table. All the data in the column will be lost.
  - You are about to drop the column `gross_sales_volume` on the `T1Transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Charts" DROP COLUMN "dateField_field",
DROP COLUMN "dateField_table",
ADD COLUMN     "dateFieldField" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dateFieldTable" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Dashboards" DROP COLUMN "dateFilter_initialDateRange",
DROP COLUMN "dateFilter_name",
ADD COLUMN     "dateFilterInitialDateRange" "DateRange" NOT NULL DEFAULT 'LAST_30_DAYS',
ADD COLUMN     "dateFilterName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "T1Products" ADD COLUMN     "costOfGoods" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "T1Transactions" DROP COLUMN "gross_sales_volume",
ADD COLUMN     "grossSalesVolume" DOUBLE PRECISION NOT NULL DEFAULT 0;
