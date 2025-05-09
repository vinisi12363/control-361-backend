import {Module} from "@/nestjs/common";
import {HttpModule} from "@/nestjs/axios";
import {VehiclesService} from "./services/vehicles/vehicles.service.ts";
import {VehiclesController} from "./controllers/vehicles.controller.ts";

@Module({
    imports: [HttpModule],
    providers: [VehiclesService]
    controller: [VehiclesController]
})
export class VehiclesModule {}