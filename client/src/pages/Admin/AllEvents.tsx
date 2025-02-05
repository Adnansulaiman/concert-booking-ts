import React, { useEffect, useState } from "react";
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

import axios from "axios";
import moment from "moment-timezone";
import { IoMdClose } from "react-icons/io";
import {  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "../../components/ui/alert-dialog";

const AllEvents = () => {
  const formatDateToIST = (dateString) => {
    return moment(dateString).tz("Asia/Kolkata").format("DD MMM YYYY");
  };
  const [concertData, setConcertData] = useState(null);
  useEffect(() => {
    const fetchUserConcert = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/concert/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConcertData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserConcert();
  }, []);

  const handleDeleteAConcert = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/concert/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Update state to remove the deleted concert
    setConcertData((prevConcerts) => prevConcerts.filter(concert => concert._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold uppercase border-b pb-2 mb-10 border-black">
        All Events
      </h1>
      {concertData ? (
        <Table className="text-lg">
          <TableCaption>A list of your concert.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {concertData?.map((concert) => (
              <TableRow key={concert?._id}>
                <TableCell>
                  <img src={concert?.image} alt={concert?.title} />
                </TableCell>
                <TableCell>{concert?.title}</TableCell>
                <TableCell>{concert?.artist}</TableCell>
                <TableCell>{concert?.category}</TableCell>
                <TableCell className="text-righ">{`${formatDateToIST(
                  concert?.date
                )}, ${concert?.time}`}</TableCell>
                <TableCell className="text-righ">
                  <ul>
                    <li>{concert?.venue?.name}</li>
                    <li>{concert?.venue?.address}</li>
                    <li>{concert?.venue?.city}</li>
                    <li>{concert?.venue?.country}</li>
                    <li>{concert?.venue?.state}</li>
                    <li>{concert?.venue?.zipcode}</li>
                  </ul>
                </TableCell>
                <TableCell className="text-right">
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
                          onClick={() => handleDeleteAConcert(concert?._id)}
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
  );
};

export default AllEvents;
