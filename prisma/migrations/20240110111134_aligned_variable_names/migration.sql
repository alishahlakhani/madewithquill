/*
  Warnings:

  - You are about to drop the column `dateFieldField` on the `Charts` table. All the data in the column will be lost.
  - You are about to drop the column `dateFieldTable` on the `Charts` table. All the data in the column will be lost.
  - You are about to drop the column `dateFilterInitialDateRange` on the `Dashboards` table. All the data in the column will be lost.
  - You are about to drop the column `dateFilterName` on the `Dashboards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Charts" DROP COLUMN "dateFieldField",
DROP COLUMN "dateFieldTable",
ADD COLUMN     "dateField_field" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dateField_table" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Dashboards" DROP COLUMN "dateFilterInitialDateRange",
DROP COLUMN "dateFilterName",
ADD COLUMN     "dateFilter_initialDateRange" "DateRange" NOT NULL DEFAULT 'LAST_30_DAYS',
ADD COLUMN     "dateFilter_name" TEXT NOT NULL DEFAULT '';
