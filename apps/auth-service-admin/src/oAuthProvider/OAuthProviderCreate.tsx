import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { UserTitle } from "../user/UserTitle";

export const OAuthProviderCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="clientId" source="clientId" />
        <TextInput label="clientSecret" source="clientSecret" />
        <TextInput label="providerName" source="providerName" />
        <TextInput label="redirectUri" source="redirectUri" />
        <TextInput label="scope" source="scope" />
        <ReferenceInput source="user.id" reference="User" label="User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
