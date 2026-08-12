AI Video Publisher
A modern frontend application for uploading videos and sending them to an n8n AI video publishing workflow.

The application provides a simple workflow:

Upload Video → Add Notes → Submit → AI Processing → YouTube Publishing

Features
🎥 Video upload

📂 Drag-and-drop support

▶️ Video preview before submission

📝 Optional video notes

🚀 Publish button

⏳ Processing status UI

✅ Success screen

❌ Error handling

📱 Responsive design

🌙 Modern dark SaaS-style interface

🔗 YouTube result link support

Workflow

User
  ↓
AI Video Publisher Frontend
  ↓
Upload Video + Notes
  ↓
n8n Production Workflow
  ↓
Gemini Video Analysis
  ↓
Generate YouTube Metadata
  ↓
Publish to YouTube
  ↓
Save Data to Google Sheets
n8n Production Endpoint
The frontend uses the following n8n production endpoint:


https://chinnuhemanth.app.n8n.cloud/form/b481fc92-3599-456e-9b8d-f313c62ee8be
Form Fields
Field	Type	Required
Video file	Video/File	Yes
Notes	Textarea	No

Supported Video Formats
MP4

MOV

WEBM

AVI

MKV

Tech Stack
React

JavaScript

HTML5

CSS3

Responsive UI

n8n

Google Gemini

YouTube

Google Sheets

Project Structure

ai-video-publisher/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── VideoUploader.jsx
│   │   ├── VideoPreview.jsx
│   │   ├── NotesInput.jsx
│   │   ├── PublishButton.jsx
│   │   ├── ProcessingStatus.jsx
│   │   ├── SuccessScreen.jsx
│   │   └── ErrorScreen.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── public/
│
├── package.json
└── README.md
How It Works
1. Upload
The user selects or drags a video into the upload area.

2. Preview
The selected video is displayed using an HTML5 video player.

3. Add Notes
The user can optionally provide instructions about the video.

4. Publish
The frontend sends:


Video file
Notes
to the n8n production workflow using multipart/form-data.

5. AI Processing
The n8n workflow handles:


Video
 ↓
Gemini
 ↓
Title
Description
Tags
 ↓
YouTube
 ↓
Google Sheets
6. Result
The frontend displays the processing result and, when available, provides a YouTube link.

Security
The frontend does not contain:

Gemini API keys

YouTube credentials

Google Sheets credentials

n8n credentials

All sensitive credentials remain inside the n8n workflow.

Running Locally
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
Then open the local URL shown by Vite.

Production Build
Create a production build:

Bash

npm run build
Preview the production build:

Bash

npm run preview
Important Note
The frontend depends on the n8n production endpoint being available and accepting the submitted form data.

If the browser blocks the request because of CORS or the n8n Form Trigger doesn't behave as expected for a custom frontend, replace the n8n Form Trigger with an n8n Webhook configured to receive multipart/form-data.

Future Improvements
📊 Publishing history dashboard

🎬 Multiple video uploads

✏️ Edit AI-generated title and description before publishing

🖼️ Custom YouTube thumbnail upload

📈 YouTube analytics

👁️ View count tracking

💰 Estimated revenue tracking

💡 AI suggestions for future videos

📅 Scheduled publishing

🔐 User authentication
