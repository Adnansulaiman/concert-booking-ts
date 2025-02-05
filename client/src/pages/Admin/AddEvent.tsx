import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"


const AddEvent = () => {
  const { toast } = useToast()
  const {
    values: eventData,
    resetForm,
    handleChange,
  } = useForm({
    title: "",
    artist: "",
    date: "",
    time: "",
    description: "",
    category: "",
    venueName: "",
    venueAddress: "",
    venueCity: "",
    venueState: "",
    venueCountry: "",
    venueZipcode: "",
    ticketType: "General",
    ticketPrice: "",
    totalTickets: "",
  });

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Event data : ", eventData);
  
    // Validate date field
    if (!eventData.date) {
      console.error("Error: Date is required!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("artist", eventData.artist);
    formData.append("date", new Date(eventData.date).toISOString());
    formData.append("time", eventData.time);
    formData.append("description", eventData.description);
    formData.append("category", eventData.category);
  
    // Venue Details
    const venue = {
      name: eventData.venueName,
      address: eventData.venueAddress,
      city: eventData.venueCity,
      state: eventData.venueState,
      country: eventData.venueCountry,
      zipcode: eventData.venueZipcode,
    };
  
    // Check if venue fields are empty
    if (Object.values(venue).some(value => !value.trim())) {
      console.error("Error: Missing venue details!", venue);
      return;
    }
    formData.append("venue", JSON.stringify(venue)); // Venue as JSON string
  
    // Ticket Details
    const ticketTypes = [
      {
        type: eventData.ticketType,
        price: parseFloat(eventData.ticketPrice),
        totalTickets: parseInt(eventData.totalTickets, 10),
        availableTickets: parseInt(eventData.totalTickets, 10), // Add this line
      }
    ];
  
    // Validate ticket fields
    if (!ticketTypes[0].type || isNaN(ticketTypes[0].price) || isNaN(ticketTypes[0].totalTickets)) {
      console.error("Error: Invalid ticket data!", ticketTypes);
      return;
    }
    formData.append("ticketTypes", JSON.stringify(ticketTypes)); // TicketTypes as JSON string
  
    // Image File
    if (file) {
      formData.append("image", file);
    }
  
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/concert/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        toast({
          description: "Successfully created concert",
          className:'text-green-500'
        })
        resetForm();
      }
    } catch (error) {
      console.error("Failed to create concert : ", error);
    }
  };

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-8 gap-5 w-full "
      >
        <div className="flex w-full gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-lg  font-semibold">
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
                name="venueName"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.venueName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Address
              </label>
              <input
                type="text"
                name="venueAddress"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.venueAddress}
                onChange={handleChange}
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
                name="venueCity"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.venueCity}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                State
              </label>
              <input
                type="text"
                name="venueState"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.venueState}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Country
              </label>
              <input
                type="text"
                name="venueCountry"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.venueCountry}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Zip code
              </label>
              <input
                type="number"
                name="venueZipcode"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.venueZipcode}
                onChange={handleChange}
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
              <select
                name="ticketType"
                id=""
                value={eventData.ticketType}
                onChange={handleChange}
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
              >
                <option value="general">General</option>
                <option value="vip">VIP</option>
                <option value="vip">WIP</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Price
              </label>
              <input
                type="number"
                name="ticketPrice"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.ticketPrice}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Total Tickets
              </label>
              <input
                type="number"
                name="totalTickets"
                className="bg-transparent border border-black py-2 rounded-full text-lg px-5 w-full"
                value={eventData.totalTickets}
                onChange={handleChange}
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
