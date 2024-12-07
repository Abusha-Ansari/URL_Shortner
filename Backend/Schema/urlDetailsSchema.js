const mongoose = require("mongoose");

const urlDetailsSchema = new mongoose.Schema({
      short_url: {
        type: String,
        require: true,
      },
      long_url: {
        type: String,
        require: true,
      },
      created_at: {
        type: Number,
        require: true,
      },
      own_url: {
        type: String,
        require: false,
      },
      
});

const urlData = new mongoose.model("URLS", urlDetailsSchema);
module.exports = urlData;
