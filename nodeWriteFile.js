/**
 * 多次请求，限制最大并发数
 * 现在需要编写一个node脚本，读取本地文件中1万个文件的内容,每个文件的内容不大于1kb.
 * 把【每三个文件内容合并成一个新的文件，写入一个磁盘地址中】, 取名为/User/bundle_0, /User/bundle_1, /User/bundle_2 …。如果剩下不足三个的文件，也可以合并成一个新的文件。
 * 要求：读取与写入文件的操作必须使用【异步接口】，并且同时读写的文件的【并发数量不能超过5个】。要求代码能尽可能快速的成这个读写任务。
 * 
 * 考点：
 * 1.限制并发数
 * 2.合并内容
 * 3.并发读写文件
 */


const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const inputDir = '/path/to/input/files'; // 输入文件夹路径
const outputDir = '/User'; // 输出文件夹路径
const filesPerBundle = 3; // 每个合并文件包含的文件数量
const concurrentLimit = 5; // 并发读写文件的数量限制

async function readAndMergeFiles() {
  // const files = await fs.readdir(inputDir);
  //   const fileBundles = [];
    
  //   // 根据每三个文件为一组，生成文件合并组
  //   for (let i = 0; i < files.length; i += filesPerBundle) {
  //       fileBundles.push(files.slice(i, i + filesPerBundle));
  //   }
    
  //   const writePromises = [];
  //   let bundleIndex = 0;
    
  //   // 并发读取文件内容、合并内容、写入新文件
  //   for (const bundle of fileBundles) {
  //       const readPromises = bundle.map(async (file) => {
  //           const content = await fs.readFile(path.join(inputDir, file), 'utf8');
  //           return content;
  //       });

  //       const bundleContent = await Promise.all(readPromises);
  //       const outputFileName = path.join(outputDir, `bundle_${bundleIndex}`);

  //       writePromises.push(writeFileAsync(outputFileName, bundleContent.join('\n')));
        
  //       // 控制并发数量
  //       if (writePromises.length >= concurrentLimit) {
  //           await Promise.all(writePromises);
  //           writePromises.length = 0;
  //       }

  //       bundleIndex++;
  //   }
    
  //   await Promise.all(writePromises); // 等待剩余的写入操作完成
  //   console.log('文件合并完成！');
  // 未确认答案
}

readAndMergeFiles().catch(console.error);
