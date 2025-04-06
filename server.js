
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join("uploads", req.file.originalname);
  fs.rename(tempPath, targetPath, err => {
    if (err) return res.sendStatus(500);
    res.send("Uploaded");
  });
});

app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json([]);
    res.json(files);
  });
});

app.get("/download/:filename", (req, res) => {
  const file = path.join(__dirname, "uploads", req.params.filename);
  res.download(file);
});

app.delete("/delete/:filename", (req, res) => {
  const file = path.join("uploads", req.params.filename);
  fs.unlink(file, err => {
    if (err) return res.sendStatus(500);
    res.send("Deleted");
  });
});

app.listen(port, () => {
  console.log(`File Manager app listening at http://localhost:${port}`);
});
