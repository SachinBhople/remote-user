import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  IAddress, useAddAddressMutation, useGetAddressesQuery } from "./redux/addressApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

// Zod schema for address form validation
const addressSchema = z.object({
  userId: z.string().optional(),
  pincode: z.number().min(100000, "Pincode must be a 6 digit number"), 
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  lastName: z.string().min(1, "Last name is required"),
  firstname: z.string().min(1, "First name is required"),
  addressType: z.string().min(1, "Address type is required"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
});

const Address = () => {
    const {user}= useSelector<RootState, any>(state => state.auth)
    const {data}= useGetAddressesQuery(user._id)

    
  const [addAddress] = useAddAddressMutation();
  const [update, setUpdate] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [modalShow, setModalShow] = useState(false);


  
   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddress>({
    resolver: zodResolver(addressSchema),
  });
console.log("----------", errors);

  const onSubmit:SubmitHandler<IAddress> = (formData) => {
    try {
        console.log(formData);
        
      addAddress({...formData, userId:user._id});  
      setModalShow(false);  
      reset();  
    } catch (error) {
      console.error("Error adding address", error);
    }
  };
  return (
    <>
      <div className="rounded-lg shadow-md border border-gray-200 position-static">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
          <p className="text-sm">
            Changes to your billing information will take effect starting with
            the next scheduled payment and will be reflected on your next
            invoice.
          </p>
        </div>
        <div className="p-4">
          {/* List group for addresses */}
          <div className="space-y-4 mb-6">
            {data &&
              data.map((item, index) => (
                <div
                  className="border-b pb-4 flex justify-between items-start"
                  key={index}
                >
                  <div>
                    <h5 className="text-lg font-semibold mb-1">{`${item.firstname} ${item.lastName}`}</h5>
                    <p className="text-sm text-gray-600">
                      <strong>Address Type:</strong> {item.addressType} <br />
                      <strong>Address:</strong> {item.address} <br />
                      <strong>City:</strong> {item.city} <br />
                      <strong>State:</strong> {item.state} <br />
                      <strong>Country:</strong> {item.country} <br />
                      <strong>Pincode:</strong> {item.pincode} <br />
                      <strong>Mobile:</strong> {item.mobile}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      title="edit"
                      onClick={() => {
                        setUpdate(true);
                        setSelectedAddress(item);
                        setModalShow(true)
                      }}
                      className="flex items-center justify-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                      <FaPencilAlt className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="trash"
                      // onClick={() => deleteAddress(item._id)}
                      className="flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Add new address button */}
          <button
            onClick={() => setModalShow(true)}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Add New Address
          </button>

          {/* Tax location info */}
          <p className="text-sm text-gray-500">
            Your tax location determines the taxes that are applied to your
            bill.
          </p>
          <Link
            to="#"
            className="text-sm text-blue-500 hover:underline"
          >
            How do I correct my tax location?
          </Link>
        </div>
      </div>

      {/* Modal */}
      {modalShow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
        {/* <pre>{errors }</pre> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              {...register("firstname", { required: "First Name is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
           
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            
          </div>

          {/* Address Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address Type</label>
            <input
              {...register("addressType", { required: "Address Type is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            
          </div>

          {/* State */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              {...register("state", { required: "State is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            
          </div>

          {/* Pincode */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              {...register("pincode", { required: "Pincode is required", valueAsNumber: true })}
              className="w-full p-2 border rounded"
              type="number"
            />
            
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              {...register("mobile", { required: "Mobile is required" })}
              className="w-full p-2 border rounded"
              type="number"
            />
            
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button
              type="button"
              onClick={() => setModalShow(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}


    </>
  );
};

export default Address;
