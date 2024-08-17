import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { UserTitle } from "../user/UserTitle";

export const OAuthProviderEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
