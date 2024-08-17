import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OAuthProviderCreateInput = {
  clientId?: string | null;
  clientSecret?: string | null;
  providerName?: string | null;
  redirectUri?: string | null;
  scope?: string | null;
  user?: UserWhereUniqueInput | null;
};
