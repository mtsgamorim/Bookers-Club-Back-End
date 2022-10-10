import { faker } from "@faker-js/faker";

export default function userFactory() {
  const data = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    image: faker.image.imageUrl(),
  };
  return data;
}
