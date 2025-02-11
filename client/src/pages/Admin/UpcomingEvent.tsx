import React,{useState,useCallback} from 'react'
import { useDropzone } from "react-dropzone";
import ButtonLoader from '../../components/ButtonLoader';
import useForm from '../../hooks/useForm';

const UpcomingEvent = () => {
    const {values:upcomingData,resetForm,handleChange} = useForm({
        title:''
    })
    const handleSubmit = (e:MouseEvent) =>{
        e.preventDefault();
        console.log(upcomingData);
        console.log(file)
    }
     const [file, setFile] = useState<(File & { preview: string }) | null>(null);
    
      // Handle file drop (only one file allowed)
      const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          const selectedFile = acceptedFiles[0];
          setFile(
            Object.assign(selectedFile, {
              preview: URL.createObjectURL(selectedFile),
            }) as File & { preview: string }
          );
        }
      }, []);
      // Setup dropzone
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] }, // Accept only images
        maxFiles: 1, // Allow only one file
      });
    
  return (
    <div className='flex flex-col '>
        <h1 className='text-3xl font-bold mb-5'>Upcoming Events</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit} >
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-lg  font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              value={upcomingData.title}
              onChange={handleChange}
            />
          </div> 
          {/* File Upload  */}
        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-2xl font-bold">Upload Image</h1>

          <div className="p-5 border  border-black rounded-lg text-center">
            {/* Drag and Drop Area */}
            <div
              {...getRootProps()}
              className="cursor-pointer p-20 bg-gray-100 hover:bg-gray-200 transition"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600 text-lg">
                Drag & drop files here, or click to select files
              </p>
            </div>

            {/* File Preview */}
            {file && (
              <div className="mt-4 w-1/2 mx-auto border p-2 rounded">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-52 object-cover rounded"
                />
                <p className="text-sm mt-2">{file.name}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-black w-full text-white font-bold text-lg py-3 rounded-full my-5"
          >
            {
            // loading ? <ButtonLoader/> : 
            'Add Upcoming Event'}
          </button>
        </div>
        </form>
        <div className="flex flex-col">
            
        </div>
    </div>
  )
}

export default UpcomingEvent