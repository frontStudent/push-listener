const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send('Hello World!')
});

app.post("/webhook", (req, res) => {
  res.send("webhook test");
});

app.post("/where-we-meet", (req, res) => {
  // 切换到root目录，执行 ./ci.sh 脚本
  exec(
    `cd ~/where-we-meet && chmod +x ci.sh && ./ci.sh`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return res.status(500).send(`执行错误: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      res.send(`执行成功: ${stdout}`);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
