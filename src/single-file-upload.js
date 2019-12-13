import React from 'react';
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'

export const UPLOAD_FILE = gql`
  mutation($file: [Upload]) {
      createSiteDocument(multipartBody: $file, siteKey: "guest") {
        id
        title
      }
  }
`;

export const UploadOneFile = () => {
    return (
        <Mutation mutation={UPLOAD_FILE}>
            {uploadFile => (
                <input
                    type="file"
                    required
                    onChange={({target: {validity, files: [file]}}) =>
                        validity.valid && uploadFile({variables: {file}})}
                />
            )}
        </Mutation>
    );
};