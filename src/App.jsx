import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import "./App.css";
import Navbar from "./components/Navbar";
import Tables from "./pass/Tables";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);
  const [form, setForm] = useState({ Site: "", Username: "", Password: "" });

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    const updatedPasswords = [...passwordArray, form];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setForm({ Site: "", Username: "", Password: "" });

    // Show success notification
    toast.success("Password saved successfully!");
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
                <div className="flex flex-col items-center justify-center gap-6 min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
                  <div className="w-full max-w-md px-4 py-6 rounded-lg shadow-lg">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:gap-4">
                      <label className="flex flex-col w-full">
                        <span className="text-gray-300 mb-1">Username</span>
                        <input
                          type="text"
                          className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out w-full"
                          placeholder="Enter username..."
                          value={form.Username}
                          onChange={handleChange}
                          name="Username"
                        />
                      </label>
                      <label className="flex flex-col w-full">
                        <span className="text-gray-300 mb-1">Password</span>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out w-full"
                            placeholder="Enter password..."
                            value={form.Password}
                            onChange={handleChange}
                            name="Password"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                          >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                          </button>
                        </div>
                      </label>
                    </div>

                    <label className="flex flex-col mb-6">
                      <span className="text-gray-300 mb-1">Website URL</span>
                      <input
                        type="text"
                        className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out w-full"
                        placeholder="Enter website URL..."
                        value={form.Site}
                        onChange={handleChange}
                        name="Site"
                      />
                    </label>

                    <div className="flex justify-center">
                      <button
                        className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                        onClick={savePassword}
                      >
                        <FontAwesomeIcon icon={faLock} className="mr-2 animate-pulse" />
                        Save Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/tables" element={<Tables passwordArray={passwordArray} />} />
        </Routes>
      </div>
      <ToastContainer /> {/* Toast notifications container */}
    </Router>
  );
}

export default App;
