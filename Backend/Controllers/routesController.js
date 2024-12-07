const urlData = require("../Schema/urlDetailsSchema");

const Home = (req,res)=>{
    return res.status(200).send("hello welcome bro");
}

const addURL = async (req, res) => {
  const { long_url, short_url } = req.body;
  const urlToStore = long_url.startsWith('http://') || long_url.startsWith('https://') 
    ? long_url 
    : `http://${long_url}`;

  try {
    const newUrl = new urlData({ long_url: urlToStore, short_url });
    await newUrl.save();
    res.status(201).send({ message: "URL Added Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to add URL" });
  }
};


  const getURL = async (req, res) => {
    const { URL } = req.params;
    try {
      const data = await urlData.find({ short_url: URL });
      if (data && data[0]) {
        const longUrl = data[0].long_url;
        const redirectUrl = longUrl.startsWith('http://') || longUrl.startsWith('https://') 
          ? longUrl 
          : `http://${longUrl}`; 
        res.redirect(302, redirectUrl);
      } else {
        res.status(404).send({ message: "URL not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch URL" });
    }
  };
  

module.exports = { Home , addURL , getURL };