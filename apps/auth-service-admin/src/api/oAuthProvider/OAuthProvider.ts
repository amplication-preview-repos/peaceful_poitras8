import { User } from "../user/User";

export type OAuthProvider = {
  clientId: string | null;
  clientSecret: string | null;
  createdAt: Date;
  id: string;
  providerName: string | null;
  redirectUri: string | null;
  scope: string | null;
  updatedAt: Date;
  user?: User | null;
};
