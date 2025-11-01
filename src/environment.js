let IS_PROD = true;
const server = IS_PROD ?
    "https://connectify-backend-qsj2.onrender.com" :
     "http://localhost:8000"
     


export default  server;