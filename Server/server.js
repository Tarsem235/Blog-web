const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ✅ Custom imports
const DBcon = require('./utlis/db.js');
const authRouter = require('./routes/auth.js');
const blogRouter = require('./routes/blogRoutes.js');
const dashboardRouter = require('./routes/Dashboard.js');
const commentRouter = require('./routes/Comments.js');
const publicRoute = require('./routes/Public.js');

// ✅ Config
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// ✅ MongoDB connection
DBcon();

// ✅ CORS configuration
app.use(
  cors({
    origin: "https://blogify-web-app-mkqy.onrender.com", // ✅ your frontend link
    credentials: true,
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ Static files for images

app.use("/images", express.static(path.join(__dirname, "public/images"))); // ✅ image path

// ✅ API Routes
app.use('/auth', authRouter);
app.use('/blog', blogRouter);
app.use('/dashboard', dashboardRouter);
app.use('/comment', commentRouter);
app.use('/api', publicRoute);

// ✅ Serve frontend React build
app.use(express.static(path.join(__dirname, 'Client/dist')));



// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
