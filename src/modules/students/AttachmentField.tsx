import { useState, useEffect } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './custom.css';

type Props = {
  fileSetter: (file: { file: string; path: string }[]) => void;
}

const AttachmentField = (props: Props) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const apiToken = currentUser.auth.api_token;

  // get formik context
  // const { setFieldValue } = useFormikContext<Student>();

  const [files, setFiles] = useState<{
    infoSheet: any[];
  }>({
    infoSheet: [],
  });

  const [filePaths, setFilePaths] = useState<{
    file: string,
    path: string
  }[]>([] as {
    file: string,
    path: string
  }[]);

  useEffect(() => {
    console.log(filePaths)
    // setFieldValue('consentForm', filePaths).then(() => {});
    props.fileSetter(filePaths);
  }, [filePaths]);

  return (
    <div className="fv-row mb-8">
      <label className="required form-label fs-5 py-2 text-muted-foreground">Upload the physical copy of the Cumulative Form should you have one</label>
      <FilePond
        acceptedFileTypes={['application/png', 'image/png', 'application/pdf', 'image/jpeg', 'application/jpg']}
        files={files.infoSheet}
        labelFileLoading={'Loading...'}
        onupdatefiles={(files) => {
          setFiles(prevState => ({...prevState, consentForm: files}))
        }}
        labelIdle='Please Upload the Consent Form'
        name={'consentForm'}
        server={{
          url: 'http://localhost:8000' + '/api',
          process: {
            // TODO make this controller action
            url: '/upload/info-sheet',
            method: 'POST',
            withCredentials: false,
            onload: (response) => {
              const parsedResponse = JSON.parse(response);
              setFilePaths(prevState => [...prevState, parsedResponse]);
              return response;
            },
            onerror: (response) => {
              const parsedResponse = JSON.parse(response);
              console.error('uploadError', parsedResponse);
              return response;
            }
          },
          revert: (uniqueFileId, load, error) => {
            fetch('http://localhost:8000/api/upload/revert', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
              },
              body: uniqueFileId
            }).then(response => {
              if (response.ok) {
                load();
              } else {
                response.json().then(errorData => error(errorData.message));
              }
            }).catch(error);
          }
        }}
      />
    </div>
  );
};

export default AttachmentField;