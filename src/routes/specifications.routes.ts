import { Router } from "express";

import { createSpecificationController } from "../modules/cars/use-cases/createSpecification";
import { listSpecificationsController } from "../modules/cars/use-cases/listSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.get("/", (request, response) => {
  const all = listSpecificationsController.handle(request, response);

  return response.json(all);
});

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
