import { DataSource } from "typeorm";

import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: ["./src/modules/cars/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"]
});

(async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Iniciou typeorm");
    })
    .catch((error) => console.log(error));
})();
