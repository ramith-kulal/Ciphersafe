import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

const Tables = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedPasswords = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  const handleEdit = (index) => {
    const newPassword = prompt("Enter the new password:");
    if (newPassword) {
      const updatedPasswords = [...passwordArray];
      updatedPasswords[index].Password = newPassword;
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
  };

  // Filter passwords based on search query
  const filteredPasswords = passwordArray.filter(
    (password) =>
      password.Site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 px-4">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Search Input */}
      <div className="search-container">
  <input
    type="text"
    placeholder="Search by site or username..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
  />
  <FontAwesomeIcon icon={faSearch} className="text-white text-xl mx-3" />
</div>

      {/* Passwords Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Site
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredPasswords.map((password, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {password.Site}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {password.Username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {password.Password}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(index)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
