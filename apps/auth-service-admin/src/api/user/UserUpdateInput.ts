import { OAuthProviderUpdateManyWithoutUsersInput } from "./OAuthProviderUpdateManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserUpdateInput = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  oAuthProviders?: OAuthProviderUpdateManyWithoutUsersInput;
  password?: string;
  roles?: InputJsonValue;
  username?: string;
};
