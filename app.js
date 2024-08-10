const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3000;

// 用于测试node服务是否正常运行
app.get("/api/*", (req, res) => {
  res.send(req.path.slice('/api/'.length));
});

// 快速测试webhook是否正常接收
app.post("/webhook", (req, res) => {
  res.send("webhook test");
});

// 接收webhook请求，并执行脚本
app.post("/webhook-api/*", (req, res) => {
  const PROJECT_NAME = req.path.slice("/webhook-api/".length);
  // 切换到root目录，执行 ./ci.sh 脚本
  exec(
    `cd ~/${PROJECT_NAME} && chmod +x ci.sh && ./ci.sh`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return res.status(500).send(`执行错误: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
    }
  );
  res.send(`deploying...`);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
