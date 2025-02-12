import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ButtonLoader from "../../components/ButtonLoader";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

// import { toast } from '../../hooks/use-toast';
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "../../components/ui/alert-dialog";


const UpcomingEvent = () => {
  const { userData } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [upcomingListData,setUpcomingListData] = useState(null);
  const {
    values: upcomingData,
    resetForm,
    handleChange,
  } = useForm({
    title: "",
  });
  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    // console.log(upcomingData);
    // console.log(file)
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", userData?._id || "");
    formData.append("title", upcomingData.title);
    // Image File
    if (file) {
      formData.append("image", file);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/upcoming/`,
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
          description: "Successfully created Upcoming concert",
          className: "text-green-500",
        });
        resetForm();
        setFile(null);
        await fetchUpcomingConcertData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //File upload
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
  const fetchUpcomingConcertData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/upcoming/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUpcomingListData(response.data)
    } catch (error) {
      console.log(error);
    }
  },[]);
  useEffect(() => {
    fetchUpcomingConcertData();
  }, [fetchUpcomingConcertData]);

  const handleDeleteAConcert = async (id:string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/upcoming/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Update state to remove the deleted concert
    setUpcomingListData((prevConcerts) => prevConcerts.filter(concert => concert._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-5">Upcoming Events</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
            {loading ? <ButtonLoader /> : "Add Upcoming Event"}
          </button>
        </div>
      </form>
      <div className="flex flex-col mt-20">
      {upcomingListData ? (
        <Table className="text-lg">
          <TableCaption>A list of your concert.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingListData?.map((upcoming) => (
              <TableRow key={upcoming?._id}>
                <TableCell>
                  <img src={upcoming?.image} alt={upcoming?.title} />
                </TableCell>
                <TableCell>{upcoming?.title}</TableCell>
                <TableCell className="justify-end flex gap-5">
                <CiEdit className="text-2xl" />
                  <AlertDialog>
                    <AlertDialogTrigger className="text-sm px-3 ">
                      <IoMdClose
                        className="text-2xl"
                        
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will delete your
                          concert.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
                          onClick={() => handleDeleteAConcert(upcoming?._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      ) : (
        <p className="text-2xl text-center text-slate-600">
          You don't have any concert data
        </p>
      )}
      </div>
    </div>
    
    </>
  );
};

export default UpcomingEvent;
