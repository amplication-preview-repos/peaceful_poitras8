import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { OAuthProviderResolverBase } from "./base/oAuthProvider.resolver.base";
import { OAuthProvider } from "./base/OAuthProvider";
import { OAuthProviderService } from "./oAuthProvider.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => OAuthProvider)
export class OAuthProviderResolver extends OAuthProviderResolverBase {
  constructor(
    protected readonly service: OAuthProviderService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
