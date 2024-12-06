const Home = (req,res)=>{
    return res.status(200).send("hello welcome bro");
}

module.exports = { Home };