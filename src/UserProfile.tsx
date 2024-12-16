import React from 'react';

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Profile Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-32 h-32 rounded-full shadow-md border"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
        <p className="text-md text-gray-600">john.doe@example.com</p>
      </div>

      {/* Profile Information Section */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
            title='name'
              type="text"
              value="John Doe"
              readOnly
              className="mt-1 p-3 w-full border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
            title='email'
              type="email"
              value="john.doe@example.com"
              readOnly
              className="mt-1 p-3 w-full border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
            title='number'
              type="text"
              value="123-456-7890"
              readOnly
              className="mt-1 p-3 w-full border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
            <input
            title='dob'
              type="text"
              value="January 1, 1990"
              readOnly
              className="mt-1 p-3 w-full border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Gender</label>
            <input
            title='gender'
              type="text"
              value="Male"
              readOnly
              className="mt-1 p-3 w-full border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Occupation</label>
            <input
            title='text'
              type="text"
              value="Software Engineer"
              readOnly
              className="mt-1 p-3 w-full border rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Profile Actions Section */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600">
          Edit Profile
        </button>
        <button className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
