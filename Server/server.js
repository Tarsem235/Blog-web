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

// ✅ CORS configuration

app.use(
  cors({
   origin: [
  "http://localhost:5173",                 // for local dev
 "https://blogweb-ten.vercel.app/"
   ],

    credentials: true,
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
// ✅ Serve frontend build
app.use(express.static(path.join(_dirname, 'Client/dist')));
// ✅ React SPA fallback (uncomment if using client-side routing like React Router)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(_dirname, 'Client/dist/index.html'));
// });
// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});