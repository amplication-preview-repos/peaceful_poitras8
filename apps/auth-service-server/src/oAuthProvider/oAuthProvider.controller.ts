import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OAuthProviderService } from "./oAuthProvider.service";
import { OAuthProviderControllerBase } from "./base/oAuthProvider.controller.base";

@swagger.ApiTags("oAuthProviders")
@common.Controller("oAuthProviders")
export class OAuthProviderController extends OAuthProviderControllerBase {
  constructor(
    protected readonly service: OAuthProviderService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
