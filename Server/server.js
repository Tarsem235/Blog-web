const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Custom imports
const DBcon = require('./utlis/db.js');
const authRouter = require('./routes/auth.js');
const blogRouter = require('./routes/blogRoutes.js');
const dashboardRouter = require('./routes/Dashboard.js');
const commentRouter = require('./routes/Comments.js');
const publicRoute = require('./routes/Public.js');

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// ✅ MongoDB connection
DBcon();

// ✅ CORS configuration (correct & safe)
app.use(
  cors({
    origin: [
      "http://localhost:5173",                    // ✅ Local dev
      "https://blogweb-ten.vercel.app"            // ✅ Vercel deployed site (remove trailing `/`)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Optional, good practice
    allowedHeaders: ["Content-Type", "Authorization"],     // ✅ Optional
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ Static files
const _dirname = path.resolve();
app.use("/images", express.static("images"));
app.use("/images", express.static(path.join(_dirname, "public/images")));

// ✅ API Routes
app.use('/auth', authRouter);
app.use('/blog', blogRouter);
app.use('/dashboard', dashboardRouter);
app.use('/comment', commentRouter);
app.use('/api', publicRoute);

// ✅ Serve frontend build (optional if using Vercel)
app.use(express.static(path.join(_dirname, 'Client/dist')));



// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
