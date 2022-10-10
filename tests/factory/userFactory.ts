import { faker } from "@faker-js/faker";

export function userFactory() {
  const data = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    image: faker.image.imageUrl(),
  };
  return data;
}

export function userFactoryWithId() {
  const data = {
    id: faker.datatype.number(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    image: faker.image.imageUrl(),
  };
  return data;
}
