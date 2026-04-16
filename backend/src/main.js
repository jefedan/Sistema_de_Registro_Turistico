
const express=require("express");
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
res.json({mensaje:"API TurismoPro Bolivia funcionando"});
});

app.listen(3000,()=>console.log("Servidor en puerto 3000"));
