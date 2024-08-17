import { OAuthProvider } from "../oAuthProvider/OAuthProvider";
import { JsonValue } from "type-fest";

export type User = {
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  oAuthProviders?: Array<OAuthProvider>;
  roles: JsonValue;
  updatedAt: Date;
  username: string;
};
