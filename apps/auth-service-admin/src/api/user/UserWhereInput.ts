import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { OAuthProviderListRelationFilter } from "../oAuthProvider/OAuthProviderListRelationFilter";

export type UserWhereInput = {
  email?: StringNullableFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  oAuthProviders?: OAuthProviderListRelationFilter;
  username?: StringFilter;
};
