import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OAuthProviderWhereInput = {
  clientId?: StringNullableFilter;
  clientSecret?: StringNullableFilter;
  id?: StringFilter;
  providerName?: StringNullableFilter;
  redirectUri?: StringNullableFilter;
  scope?: StringNullableFilter;
  user?: UserWhereUniqueInput;
};
