import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send("Hello world, we got the. fiqr not"); 
})

app.listen(PORT, () => {
    console.log(`Server up and running at PORT ${PORT}`); 
})






