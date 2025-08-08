# 🚀 Pindhood Media - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
3. **GitHub Repository**: Push your code to GitHub

## Step 1: Set up MongoDB Atlas (Database)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select a cloud provider and region
   - Name your cluster (e.g., "pindhood-media")

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `pindhoodadmin`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - This is needed for Vercel serverless functions

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://pindhoodadmin:<password>@pindhood-media.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

## Step 2: Push Code to GitHub

1. **Initialize Git Repository** (if not already done)
   ```bash
   cd pindhood-agency
   git init
   git add .
   git commit -m "Initial commit - Pindhood Media website"
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com)
   - Click "New Repository"
   - Name: `pindhood-media-website`
   - Make it Public or Private
   - Don't initialize with README (since you already have code)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/pindhood-media-website.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your `pindhood-media-website` repository

2. **Configure Project Settings**
   - **Project Name**: `pindhood-media`
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://pindhoodadmin:YOUR_PASSWORD@pindhood-media.xxxxx.mongodb.net/pindhood-agency?retryWrites=true&w=majority
   CLIENT_URL = https://your-app-name.vercel.app
   ```
   
   Replace:
   - `YOUR_PASSWORD` with your MongoDB password
   - `your-app-name` with your actual Vercel app name

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-3 minutes)

## Step 4: Verify Deployment

1. **Check Frontend**
   - Visit your Vercel URL (e.g., `https://pindhood-media.vercel.app`)
   - Verify all sections load properly
   - Check that videos play correctly

2. **Test Contact Form**
   - Fill out the contact form
   - Submit and verify you see "Message sent successfully!"
   - Check MongoDB Atlas to see if data was saved

3. **Test Business Details Form**
   - Switch to "Business Details" tab
   - Fill out and submit
   - Verify success message

## Step 5: Custom Domain (Optional)

1. **Buy a Domain** (e.g., `pindhoodmedia.com`)
2. **Add to Vercel**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `MONGODB_URI` | Database connection | Your Atlas connection string |
| `CLIENT_URL` | Frontend URL for CORS | `https://pindhood-media.vercel.app` |

## Database Collections

Your MongoDB will automatically create these collections:

1. **contacts** - Contact form submissions
2. **portfolios** - Portfolio items (if you add them later)

## Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check MongoDB URI in environment variables
   - Verify network access allows 0.0.0.0/0
   - Ensure password doesn't contain special characters

2. **API Routes Not Working**
   - Check `vercel.json` configuration
   - Verify backend files are in `/backend` folder
   - Check function logs in Vercel dashboard

3. **Contact Form Not Submitting**
   - Check browser console for errors
   - Verify API URL in Contact.jsx
   - Check CORS settings in server.js

### Viewing Logs:
- Go to Vercel Dashboard
- Click your project
- Go to "Functions" tab
- Click on any function to see logs

## Success! 🎉

Your Pindhood Media website is now live and can:
- ✅ Accept contact form submissions
- ✅ Store business details in MongoDB
- ✅ Handle video portfolio display
- ✅ Work on all devices
- ✅ Scale automatically with traffic

## Next Steps

1. Set up Google Analytics
2. Add SEO optimization
3. Set up email notifications for form submissions
4. Add more portfolio items through the admin interface
5. Set up automated backups for MongoDB

---

Need help? Check the [Vercel Documentation](https://vercel.com/docs) or [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/). 