const urlData = require("../Schema/urlDetailsSchema");

const Home = (req,res)=>{
    return res.status(200).send("hello welcome bro");
}

const addURL = async (req,res) => {
    try {
      const url = req.body;
      const newUrl = new urlData(url);
      await newUrl.save();
      res.status(200).send("URL added to the database");
    } catch (error) {
      res.status(400).send({message: error.message})
    }
  };

  const getURL = async (req, res) => {
    const { URL } = req.params;
    const userEnteredShortURL = URL;
    try {
      const data = await urlData.find({ short_url: userEnteredShortURL }); 
      if(data){
        res.redirect(302,data[0].long_url)
      }
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch URL" });
    }
  };

module.exports = { Home , addURL , getURL };