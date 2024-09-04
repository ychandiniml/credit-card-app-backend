import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import cardRoutes from "./api/routes/cardRoutes.js";
import bankRoutes from "./api/routes/bankRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/card", cardRoutes);
app.use("/api/bank", bankRoutes);

var PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('app listening on port ' + PORT);
});