require("dotenv").config()

const express      = require("express")
const cors         = require("cors")
const walletRoutes = require("./routes/wallet")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/wallet", walletRoutes)

app.get("/health", (req, res) => res.json({ status: "ok" }))

app.listen(3000, () => {
  console.log("WalletLens backend running on port 3000")
})