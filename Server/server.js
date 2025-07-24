const express = require('express');
const dotenv = require('dotenv');
const DBcon = require('./utlis/db.js');
const router = require('./routes/auth.js');
const blogrouter = require('./routes/blogRoutes.js');
const dashboardRouter = require('./routes/Dashboard.js');
const commentRouter = require('./routes/Comments.js');
const publicRoute = require('./routes/Public.js');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// ✅ MongoDB connect
DBcon();

// ✅ CORS for frontend
app.use(cors({
  origin: 'https://blogify-web-app-mkqy.onrender.com',
  credentials: true,
}));

// ✅ Middlewares
const _dirname = path.resolve();
app.use(cookieparser());
app.use(express.json());

// ✅ Serve static public folder
app.use(express.static(path.join(_dirname, 'public')));

// ✅ If images are inside public/images/xyz.jpg
// Then URL will be: https://yourdomain.com/images/xyz.jpg
// No need to use `/images` route separately if inside public

// ✅ All API routes
app.use('/auth', router);
app.use('/blog', blogrouter);
app.use('/dashboard', dashboardRouter);
app.use('/comment', commentRouter);
app.use('/api', publicRoute);
app.use('/images', express.static(path.join(_dirname, 'public/images')));
// ✅ Serve frontend React (or Vite) app from /Client/dist
app.use(express.static(path.join(_dirname, 'Client/dist')));

// ✅ React SPA fallback route (if needed)


// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
