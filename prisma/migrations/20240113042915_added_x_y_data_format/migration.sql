-- CreateEnum
CREATE TYPE "FieldFormatType" AS ENUM ('format_date', 'format_currency', 'format_number', 'format_text');

-- AlterTable
ALTER TABLE "Charts" ADD COLUMN     "xAxisField_format" "FieldFormatType" NOT NULL DEFAULT 'format_text',
ADD COLUMN     "yAxisField_format" "FieldFormatType" NOT NULL DEFAULT 'format_text';
