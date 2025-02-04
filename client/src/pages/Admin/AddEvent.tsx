import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useForm from "../../hooks/useForm";

const AddEvent = () => {
  const {values:eventData,resetForm,handleChange} = useForm({
    title:'',
    artist:'',
    date:'',
    time:'',
    description:'',
    category:'',
    image:''

  });

  // Handle form submit
  const handleSubmit = (e:MouseEvent) =>{
    e.preventDefault();
    console.log(eventData)
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
    <div>
      <h1 className="text-3xl font-bold uppercase border-b pb-2 border-black">
        Add Event
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col pt-8 gap-5 w-full ">
        <div className="flex w-full gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-lg font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              value={eventData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-lg font-semibold">
              Artist
            </label>
            <input
              type="text"
              name="artist"
              className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              value={eventData.artist}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-lg font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              value={eventData.date}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-lg font-semibold">
              Time
            </label>
            <input
              type="time"
              name="time"
              className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              value={eventData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="text-lg font-semibold">
            Description
          </label>
          {/* <input
              type="text"
              name="title"
              className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
            /> */}
          <textarea
            name="description"
            id=""
            className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
            value={eventData.description}
            onChange={handleChange}
          >
            Description
          </textarea>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="text-lg font-semibold">
            Category
          </label>
          <input
            type="text"
            name="category"
            className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
            value={eventData.category}
              onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Venue</h1>
          <div className="flex w-full gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                City
              </label>
              <input
                type="text"
                name="city"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                State
              </label>
              <input
                type="text"
                name="state"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Zip code
              </label>
              <input
                type="number"
                name="zip"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Ticket</h1>
          <div className="flex w-full gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Type
              </label>
              {/* <input
                type="text"
                name="name"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              /> */}
              <select name="type" id="" className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full">
                <option value="general">General</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Price
              </label>
              <input
                type="number"
                name="address"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Total Tickets
              </label>
              <input
                type="number"
                name="state"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              />
            </div>
          </div>
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
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
