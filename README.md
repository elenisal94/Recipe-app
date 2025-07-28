# Eleni's Recipe Paradise 🥘

A recipe sharing platform for friends around the world to share their favourite dishes, discover new recipes, and rate each other's culinary creations.

**Live Site:** [https://eleni-recipe-paradise.onrender.com/](https://eleni-recipe-paradise.onrender.com/)  
**Project Details:** [View full case study](https://elenisalamouri.co.uk/elenis-recipe-paradise/)

<i>Preview of a shrimp pasta recipe</i>
<img width="1422" alt="Screenshot 2024-07-04 at 10 16 37" src="https://github.com/elenisal94/Recipe-app/assets/57360206/0e747d48-f959-4b40-b6ab-36c506bc034a">

## 🎯 About This Project

This project is my first fully deployed full-stack application, built to implement complete CRUD functionality and tested with real users. The platform allows friends to share recipes regardless of their location, creating a global community of food enthusiasts.

The primary focus was on creating a robust, user-friendly platform that handles various measurement systems, user authentication, and real-time interactions while maintaining clean, maintainable code architecture.

## 🛠️ Technical Skills
**Frontend:**
```
JavaScript • HTML • CSS • EJS
```

**Backend & Database:**
```
Node.js • Express • MongoDB Atlas
```

**APIs & Integration:**
```
Mapbox • Cloudinary • REST APIs
```

**Deployment & Tools:**
```
Render • Git • npm
```

## ✨ Key Features

- **User Authentication & Authorisation** - Secure signup/login with session management
- **Recipe CRUD Operations** - Create, read, update, and delete recipes
- **Rating System** - Users can rate and review each other's recipes
- **Real-time Unit Conversion** - Seamless conversion between metric and imperial units
- **Image Upload** - Recipe photo uploads via Cloudinary integration
- **Interactive Maps** - Location visualization using Mapbox
- **Responsive Design** - Mobile-friendly interface
- **User Permissions** - Users can only edit their own recipes while viewing all others

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/elenisal94/Recipe-app.git
   cd Recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   MAPBOX_TOKEN=your_mapbox_token
   DB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   ```

4. **Start the application**
   ```bash
   node app.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
Recipe-app/
├── cloudinary/      # Image upload configuration
├── controllers/     # Business logic and CRUD operations
├── helper/          # Utility functions and helpers
├── models/          # MongoDB schemas and data models
├── public/          # Static assets (CSS, JavaScript, images)
├── routes/          # Express route handlers
├── seeds/           # Database seeding scripts
├── uploads/         # File upload handling
├── utils/           # Utility functions
├── views/           # EJS templates and layouts
├── app.js           # Main application entry point
├── middleware.js    # Authentication and validation middleware
├── schemas.js       # Data validation schemas
└── package.json     # Dependencies and scripts
```

## 📦 Key Dependencies

**Core Framework:**
- Express.js - Web application framework
- Mongoose - MongoDB object modeling
- EJS & EJS-Mate - Template engine and layout support

**Authentication & Security:**
- Passport.js & Passport-Local-Mongoose - User authentication
- Helmet - Security middleware
- Express-Mongo-Sanitize - Input sanitization

**File Upload & Storage:**
- Cloudinary - Image upload and optimization
- Multer - File upload handling

**Maps & Location:**
- Mapbox SDK & Mapbox GL - Interactive maps and geolocation

**Utilities:**
- Convert-Units - Measurement conversions
- Joi - Data validation
- Method-Override - HTTP verb support

## 🔧 Key Technical Implementations
Implemented real-time unit conversion using the `convert-units` library. All data is stored in metric units in the database, with imperial conversions happening on-the-fly during display, optimising storage space and ensuring data consistency.

### Authentication & Authorisation
Built custom middleware for user authentication and authorisation, ensuring users can view all recipes but only edit their own. Session management handles user state across the application.

### Image Management
Integrated Cloudinary for efficient image upload, storage, and optimisation. Users can upload recipe photos with automatic image optimisation for fast loading.

## 📊 Results & Impact

- **Live for several months** with consistent uptime and performance
- **~50 active users** testing and using the platform regularly
- **Zero reported bugs** or data loss issues
- **Positive user feedback** praising the intuitive interface and smooth experience
- **Robust performance** under real-world usage conditions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ and lots of ☕*
