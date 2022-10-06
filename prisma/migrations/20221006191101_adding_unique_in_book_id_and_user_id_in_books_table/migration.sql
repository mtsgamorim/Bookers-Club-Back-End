/*
  Warnings:

  - A unique constraint covering the columns `[bookId,userId]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_bookId_userId_key" ON "books"("bookId", "userId");
