import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3001;
const app = express();

// 打印当前目录下的所有静态html文件
function logStaticHtmlFiles() {
  try {
    const staticHtmlFiles = globSync('./*.html', { nodir: true });
    console.log('\x1b[32m%s\x1b[0m', '以下是测试链接：');
    staticHtmlFiles.forEach((file, index) => {
      // 使用 path.basename 获取文件名，去掉路径前缀
      const fileName = path.basename(file);
      console.log(
        '\x1b[34m%s\x1b[0m',
        `👉 ${index + 1}. http://localhost:${port}/${fileName}`
      );
    });
  } catch (err) {
    console.error('读取目录时发生错误:', err);
  }
}
// function log(req, res, next) {
//   logStaticHtmlFiles();
//   next();
// }
// app.use(log);
app.use(express.static(path.join(__dirname, '.')));
app.use('/core', express.static(path.join(__dirname, '../core')));
app.use(
  '/node_modules',
  express.static(path.join(__dirname, '../node_modules'))
);

app.listen(port, () => {
  console.log('\x1b[31m%s\x1b[0m', `服务运行在: http://localhost:${port}`);
  logStaticHtmlFiles();
});
