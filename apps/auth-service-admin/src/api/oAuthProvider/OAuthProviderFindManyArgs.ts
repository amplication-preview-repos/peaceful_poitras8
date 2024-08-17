import { OAuthProviderWhereInput } from "./OAuthProviderWhereInput";
import { OAuthProviderOrderByInput } from "./OAuthProviderOrderByInput";

export type OAuthProviderFindManyArgs = {
  where?: OAuthProviderWhereInput;
  orderBy?: Array<OAuthProviderOrderByInput>;
  skip?: number;
  take?: number;
};
