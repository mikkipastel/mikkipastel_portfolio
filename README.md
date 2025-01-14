# MikkiPastel Portfolio Website

This is my portfolio website
https://portfolio.mikkipastel.com

### Made by :
- HTML + CSS + JavaScript
- Firebase Hosting
- static website with call dynamic data from API with Ghost CMS and Firebase Cloud Function
- PWA support
- LOVE pixel art

### What's content in my portfolio website?
- About me
- Lasted Blog
- Publish Application
- Android Project (Archive)
- Web Application / Chatbot
- Experience Timeline
- Work Experience

## Deploy

- install all library
```
npm install
```

- install Firebase CIL
```
npm install -g firebase-tools
```

### Firebase Cloud Function
```
cd functions
// deploy all
npm run deploy
// deploy only function
firebase deploy --only functions:FUNCTION_NAME
```

### Firebase Hosting
```
cd public
// preview
firebase hosting:channel:deploy CHANNEL_ID
// public deploy
firebase deploy --only hosting
```