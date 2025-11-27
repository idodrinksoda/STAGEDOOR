# MongoDB Setup for STAGEDOOR

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (free tier M0)
4. Create a database user (username/password)
5. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs in development)
6. Get your connection string
7. Replace the MONGODB_URI in backend/.env

### Connection String Format:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

## Option 2: Local MongoDB (For Development)

### macOS:
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connection string for local:
MONGODB_URI=mongodb://localhost:27017/stagedoor
```

### Windows:
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. MongoDB runs as service by default

### Linux:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start service
sudo systemctl start mongodb
```

## Quick Demo (No Setup Required)

For a quick demo, you can use this temporary connection string:
```
MONGODB_URI=mongodb://localhost:27017/stagedoor
```

But we'll run the app without MongoDB first to show you the frontend!
