/*
  Warnings:

  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_userId_fkey";

-- DropTable
DROP TABLE "books";

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "review" TEXT,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_bookId_userId_key" ON "book"("bookId", "userId");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
