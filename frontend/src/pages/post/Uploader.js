import React , {useState} from 'react';
import S3 from 'react-aws-s3';
import toast, { Toaster } from 'react-hot-toast';

window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const Uploader = ({setimagePreSignedUrl}) => {

    const [selectedFile, setSelectedFile] = useState(null);

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => {console.log(data.location, "hi");setimagePreSignedUrl(data.location);  toast.success('File Uploaded Sucessfully');})
        .catch(err => console.error(err))
    }
    return <div>
         <Toaster /> 
        <input type="file" onChange={handleFileInput}/>
        <br></br>
        <button onClick={() => uploadFile(selectedFile)}> Upload file</button>
    </div>
}

export default Uploader;