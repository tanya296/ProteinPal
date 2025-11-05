# 🍽️ ProteinPal - Smart Protein Food Finder

A modern, full-stack web application that helps users find high-protein foods within their budget. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

- 🔍 **Smart Search**: Search foods by name or filter by budget
- 📊 **Category Filters**: Browse foods by categories (Dairy, Meat, Plant-Based, etc.)
- 💪 **Protein Efficiency**: Automatically calculates and displays protein per rupee
- 📈 **Multiple Sorting Options**: Sort by protein efficiency, highest protein, or lowest price
- 🎨 **Beautiful UI**: Modern gradient design with responsive cards
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📊 **Statistics Dashboard**: View average protein, price, and total items

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Axios for API calls
- Modern CSS with gradients and animations

### Backend
- Node.js with Express 5.1.0
- MongoDB with Mongoose 8.19.2
- RESTful API architecture
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
cd d:\webtechproject\ProteinPal
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Environment Variables
The `.env` file is already configured with MongoDB connection string:
```
MONGO_URI=mongodb+srv://tanyakumar2006_db_user:Pad%40snu24.@cluster0.0dkmbma.mongodb.net/proteinpal?retryWrites=true&w=majority
```

### 5. Seed the Database
Run this command to populate the database with sample food data:
```bash
node seed.js
```

You should see: `✅ Data seeded`

## 🎯 Running the Application

### Start Backend Server
```bash
npm start
```
Backend will run on: `http://localhost:5000`

### Start Frontend (in a new terminal)
```bash
cd frontend
npm start
```
Frontend will run on: `http://localhost:3000`

## 📡 API Endpoints

### Foods
- `GET /api/foods` - Get all foods (sorted by protein efficiency)
- `GET /api/foods/budget/:amount` - Get foods under specified budget
- `GET /api/foods/category/:category` - Get foods by category
- `GET /api/foods/categories/all` - Get all unique categories
- `GET /api/foods/search/:query` - Search foods by name
- `POST /api/foods` - Add a new food item

## 🎨 Features Breakdown

### Search & Filter
- **Budget Search**: Enter a budget to find all foods within that price range
- **Name Search**: Search for specific foods by name (case-insensitive)
- **Category Filter**: Click on category chips to filter by food type

### Sorting Options
- **Protein Efficiency**: Best protein per rupee ratio (default)
- **Highest Protein**: Foods with the most protein content
- **Lowest Price**: Most affordable options

### Food Cards Display
Each food card shows:
- Food image
- Name and brand
- Category badge
- Price in ₹
- Nutrition info (Protein, Calories, Carbs, Fat)
- Protein efficiency metric
- Serving size

### Statistics Bar
Real-time statistics showing:
- Total number of food items
- Average protein content
- Average price

## 📁 Project Structure

```
ProteinPal/
├── backend/
│   └── (legacy backend files)
├── config/
│   └── db.js              # MongoDB connection
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js         # Main React component
│       ├── App.css        # Styling
│       ├── services/
│       │   └── foodService.js  # API service layer
│       └── index.js
├── models/
│   └── foodModel.js       # Mongoose schema
├── routes/
│   └── foodRoute.js       # Express routes
├── .env                   # Environment variables
├── server.js              # Express server
├── seed.js                # Database seeder
└── package.json
```

## 🗃️ Database Schema

```javascript
{
  name: String,           // Food name
  brand: String,          // Brand name
  category: String,       // Food category
  price: Number,          // Price in ₹
  protein: Number,        // Protein in grams
  calories: Number,       // Calories
  carbs: Number,          // Carbs in grams
  fat: Number,            // Fat in grams
  fiber: Number,          // Fiber in grams
  servingSize: String,    // Serving size description
  image: String           // Image URL
}
```

## 🎯 Sample Food Categories

- Natural (Eggs, Sprouts)
- Dairy (Paneer, Milk, Greek Yogurt)
- Meat (Chicken, Fish)
- Plant-Based (Tofu, Soya Chunks)
- Packaged (Protein Bars, Cookies)
- Supplement (Whey Protein, Protein Shakes)
- Legume (Lentils)
- Nut Butter (Peanut Butter)
- Grain (Oats)
- Snack (Mixed Nuts)
- Meal (Sandwiches)
- Seafood (Fish)

## 🔧 Helper Functions

### Backend
- `calculateProteinPerRupee(food)` - Calculates protein efficiency
- `sortByProteinEfficiency(foods)` - Sorts foods by protein per rupee

### Frontend
- `loadInitialData()` - Loads all foods and categories
- `handleBudgetSearch()` - Filters by budget
- `handleCategoryFilter()` - Filters by category
- `handleSearch()` - Searches by name
- `calculateStats()` - Computes statistics

## 🎨 Design Features

- **Gradient Backgrounds**: Purple-blue gradient theme
- **Card Hover Effects**: Smooth animations on hover
- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: Spinner animation during data fetch
- **Empty States**: Friendly messages when no results found
- **Modern Typography**: Clean, readable fonts
- **Color-Coded Elements**: Visual hierarchy with colors

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in `.env`
- Ensure port 5000 is not in use
- Run `npm install` to install dependencies

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS is enabled in `server.js`
- Ensure API_URL in `foodService.js` is correct

### Database connection issues
- Verify MongoDB Atlas credentials
- Check network connectivity
- Ensure IP whitelist includes your IP

## 📝 Development Scripts

```bash
# Backend
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)

# Frontend
npm start          # Start React dev server
npm run build      # Build for production
npm test           # Run tests
```

## 🚀 Future Enhancements

- User authentication and profiles
- Favorite foods list
- Meal planning feature
- Nutrition goals tracking
- Shopping list generator
- Price comparison across stores
- Recipe suggestions
- Barcode scanner integration

## 👨‍💻 Author

Built with ❤️ for health-conscious food lovers

## 📄 License

ISC License

---

**Happy Protein Hunting! 💪🍽️**
