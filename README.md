# Fontorical - Interactive Story Game  

**Fontorical** is an interactive text-based adventure game built with **Next.js**, using **Azure Cosmos DB** for game state management and **Google OAuth** for authentication. The project features a short gameplay story with audio cues and hidden secrets that players can unlock during gameplay.  

---

## 🚀 Features  
- **Story Paths** – Players can make decisions that shape the narrative, with different branches and endings.  
- **Audio Cues** – Immersive soundscapes that change based on the player's choices (danger, mystery, calm, etc.).  
- **Google OAuth Integration** – Secure login system allowing users to save game progress.  
- **Azure Cosmos DB** – Tracks user states and stores custom usernames for personalized experiences.   

---

## 🎮 How to Play  
1. **Start the Game** – Visit the home page and click "Start Game."  
2. **Log In** – Authenticate using your Google account.  
3. **Create a Username** – Enter a custom username if prompted.  
4. **Make Decisions** – Follow the story and type commands like `left`, `right`, `explore`, or `return`.  

---

## 🛠️ Tech Stack  
- **Frontend**: Next.js (App Router), Tailwind CSS  
- **Backend**: Azure Cosmos DB (serverless), Next.js API routes  
- **Authentication**: Google OAuth with `next-auth`  
- **Audio**: Howler.js for dynamic sound management  
- **Deployment**: Azure Static Web Apps  

---

## ⚙️ Setup and Installation  
### 1. Clone the Repository  

```bash
git clone https://github.com/yourusername/fontorical.git
cd fontorical
```

## Install Dependencies
```bash
npm install
```

## Configure Environment Variables
Create a .env.local file in the root directory and add:
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
COSMOS_DB_ENDPOINT=https://your-cosmosdb-account.documents.azure.com
COSMOS_DB_KEY=your-primary-key
COSMOS_DB_DATABASE=db-name
COSMOS_DB_CONTAINER=container-name
NEXTAUTH_SECRET=your-nextauth-secret
```

## Run Development Server
```bash
npm run dev
```




## Screenshots / Demo
<video controls width="800">
  <source src="./public/video/Fontorical-Preview.webm" type="video/webm">
</video>
![Video Demo](./public/video/Fontorical-Preview.webm)


## GDPR & Privacy Compliance
Cookie Consent – Users are prompted to accept or decline cookies upon visiting the site.
Data Deletion – Users can request to delete their saved data from the settings page.

## License
This project is licensed under the MIT License – feel free to use and modify it for personal or educational purposes
