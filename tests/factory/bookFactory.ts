import { faker } from "@faker-js/faker";

export function bookFactory() {
  const data = {
    bookId: faker.lorem.word(),
    title: faker.lorem.word(),
  };
  return data;
}
