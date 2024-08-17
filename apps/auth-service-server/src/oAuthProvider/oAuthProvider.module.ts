import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { OAuthProviderModuleBase } from "./base/oAuthProvider.module.base";
import { OAuthProviderService } from "./oAuthProvider.service";
import { OAuthProviderController } from "./oAuthProvider.controller";
import { OAuthProviderResolver } from "./oAuthProvider.resolver";

@Module({
  imports: [OAuthProviderModuleBase, forwardRef(() => AuthModule)],
  controllers: [OAuthProviderController],
  providers: [OAuthProviderService, OAuthProviderResolver],
  exports: [OAuthProviderService],
})
export class OAuthProviderModule {}
