import { useState, useEffect } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './custom.css';

type Props = {
  fileSetter: (file: { file: string; path: string }[]) => void;
}

const AttachmentField = (props: Props) => {
  const [files, setFiles] = useState<any[]>([]);
  const [filePaths, setFilePaths] = useState<{ file: string, path: string }[]>([]);

  useEffect(() => {
    props.fileSetter(filePaths);
    console.log(filePaths);
  }, [filePaths]);

  return (
    <div className="fv-row mb-8">
      <label className="required form-label fs-5 py-2 text-muted-foreground">Upload the physical copy of the Cumulative Form should you have one</label>
      <FilePond
        maxFiles={1}
        acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf']}
        files={files}
        labelFileLoading={'Loading...'}
        onupdatefiles={setFiles}
        labelIdle='Please Upload the Consent Form'
        name={'infoSheet'}
        server={{
          url: 'http://localhost:8000/api',
          process: {
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
              body: JSON.stringify({ path: uniqueFileId })
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