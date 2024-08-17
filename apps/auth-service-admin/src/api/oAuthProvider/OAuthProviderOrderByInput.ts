import { SortOrder } from "../../util/SortOrder";

export type OAuthProviderOrderByInput = {
  clientId?: SortOrder;
  clientSecret?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  providerName?: SortOrder;
  redirectUri?: SortOrder;
  scope?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
