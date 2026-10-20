const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio Backend is Running 🚀",
  });
});

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected Successfully");

//     const PORT = process.env.PORT || 5000;

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB Connection Error:", error.message);
//   });

let isConnected =false;
async function ConnectToMongoDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI)
    isConnected=true;
    console.log('connected to MongoDB');
  }catch(error){
    console.log('Error connecting to mongodb:',error);
  }
}

app.use((req,res,next)=>{
  if(!isConnected){
    connectToMongoDB();
  }
  next();
})

module.exports = app