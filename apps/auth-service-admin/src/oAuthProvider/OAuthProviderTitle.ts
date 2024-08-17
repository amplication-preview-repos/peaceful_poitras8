import { OAuthProvider as TOAuthProvider } from "../api/oAuthProvider/OAuthProvider";

export const OAUTHPROVIDER_TITLE_FIELD = "providerName";

export const OAuthProviderTitle = (record: TOAuthProvider): string => {
  return record.providerName?.toString() || String(record.id);
};
