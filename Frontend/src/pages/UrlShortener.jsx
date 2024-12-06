import React, { useState } from "react";

const UrlShortener = () => {
  const [option, setOption] = useState("random");
  const [formData, setFormData] = useState({ originalUrl: "", customUrl: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    
    setTimeout(() => {
      setMessage("Your short URL has been successfully created!");
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-96 p-6 rounded-lg bg-gray-800 shadow-lg">
        <h1 className="text-center text-xl font-bold mb-4">WELCOME TO URL SHORTNER</h1>

        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => {
              setOption("random");
              setMessage("");
            }}
            className={`px-4 py-2 w-1/2 border-r border-gray-700 text-center ${
              option === "random" ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Random
          </button>
          <button
            type="button"
            onClick={() => {
              setOption("customized");
              setMessage("");
            }}
            className={`px-4 py-2 w-1/2 text-center ${
              option === "customized" ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Customized
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="mb-4">
          {option === "random" && (
            <input
              type="text"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleChange}
              placeholder="Enter Your URL"
              className="w-full px-3 py-2 text-black rounded-lg mb-2"
              required
            />
          )}
          {option === "customized" && (
            <div>
              <input
                type="text"
                name="originalUrl"
                value={formData.originalUrl}
                onChange={handleChange}
                placeholder="Enter Original URL"
                className="w-full px-3 py-2 text-black rounded-lg mb-2"
                required
              />
              <input
                type="text"
                name="customUrl"
                value={formData.customUrl}
                onChange={handleChange}
                placeholder="Enter Custom URL"
                className="w-full px-3 py-2 text-black rounded-lg"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Generate Short URL
          </button>
        </form>

        {message && (
          <div className="mt-4 p-4 bg-green-700 text-center rounded-lg">
            {message}
            <h1>Your URL is: </h1> 
          </div>
        )}

        <div className="text-right mt-4">
          <button className="text-sm underline">LOG IN</button>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
