import { OAuthProviderCreateNestedManyWithoutUsersInput } from "./OAuthProviderCreateNestedManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserCreateInput = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  oAuthProviders?: OAuthProviderCreateNestedManyWithoutUsersInput;
  password: string;
  roles: InputJsonValue;
  username: string;
};
