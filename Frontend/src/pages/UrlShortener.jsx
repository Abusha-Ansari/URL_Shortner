import React, { useState } from "react";

const UrlShortener = () => {
  const [option, setOption] = useState("random");
  const [formData, setFormData] = useState({ long_url: "", own_url: "" , short_url: "" , created_at: 0 });
  const [message, setMessage] = useState("");

  const addUrl = async () => {
    try {
      const response = await fetch('http://localhost:6969/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.alert("URL Added Successfully");
      } else {
        const errorData = await response.json();
        window.alert(`Failed to Add URL: ${errorData.message}`);
      }
    } catch (error) {
      window.alert(`Failed to Add URL: ${error.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = Date.now(); 
    if (option === "random") {
      setFormData((prev) => ({
        ...prev,
        short_url: Math.floor(10000 + Math.random() * 90000),
        created_at: timestamp,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        created_at: timestamp,
      }));
    }
    addUrl();
    console.log(formData);
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
              name="long_url"
              value={formData.long_url}
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
                name="long_url"
                value={formData.long_url}
                onChange={handleChange}
                placeholder="Enter Original URL"
                className="w-full px-3 py-2 text-black rounded-lg mb-2"
                required
              />
              <input
                type="text"
                name="own_url"
                value={formData.own_url}
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
