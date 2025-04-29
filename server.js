const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/fetch-data', async (req, res) => {
    const { model, startId, endId } = req.query;
    const results = [];

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const total = parseInt(endId) - parseInt(startId) + 1;
    let completed = 0;

    for (let id = parseInt(startId); id <= parseInt(endId); id++) {
        try {
            const response = await axios.get(`https://watch-appstore.iot.mi.com/api/watchface/prize/detail?model=${model}&id=${id}`);
            if (response.data && response.data.code === 200) {
                results.push({
                    id: id,
                    data: response.data
                });
                // 发送成功请求的详细数据
                res.write(`data: ${JSON.stringify({
                    type: 'detail',  // 新增type类型
                    id: id,
                    data: response.data
                })}\n\n`);
            }
            // 发送日志信息
            res.write(`data: ${JSON.stringify({
                type: 'log',
                status: response.data?.code === 200 ? 'success' : 'notfound',
                id: id,
                message: response.data?.code === 200 ?
                    `<span style="color:rgb(19, 153, 99);">[   OK   ]</span> ID ${id} in ${model} has been added to the list.` :
                    `<span style="color:rgb(97, 97, 97);">[  NULL  ]</span> Could not find watchface for ID ${id} in model ${model}.`
            })}\n\n`);
        } catch (error) {
            res.write(`data: ${JSON.stringify({
                type: 'log',
                status: 'error',
                id: id,
                message: `<span style="color:rgb(194, 47, 47);">[FALIED]</span> Error: ID ${id} at ${model}, ${error.message}`
            })}\n\n`);
        }

        completed++;
        res.write(`data: ${JSON.stringify({
            type: 'progress',
            progress: (completed / total) * 100,
            completed,
            total
        })}\n\n`);
    }

    res.write('event: complete\ndata: ' + JSON.stringify(results) + '\n\n');
    res.end();
});

const PORT = process.env.PORT || 3000;
const chalk = require('chalk');
const supportsColor = chalk.supportsColor;

// 启动服务器并显示ASCII字符画
app.listen(PORT, () => {
    console.log('\n');

    // 你的ASCII字符画
    const asciiArt = `
      ..:-----========-----:..      
   .:-===========--===========-:.          Get Xiaomi Watchface
  -==============**==============-         Version: 1.0.0
 -=============-+@@+-=============-        
:==============-+@@+-==============:       https://github.com/useless-anlong/get-mi-watchface
-=========--===-+@@+-===--=========-       
==========++=---+@@+---=++==========       
==========%@@#+-+@@+-+#@@%==========
==========-=#@@%#@@#%@@#=-==========       
-===========-=*%@@@@%*=-===========-
:========-------=**=-------========:       Server running at
 -======-*%%%%%%%%%%%%%%%%*-======-        http://localhost:${PORT}
  -=====-+****************+-=====-         
   .:-===------------------===-:.          Press [CTRL] + [C] to stop the server
      ..:----==========----:..             
  `;

    // 使用chalk添加颜色 - 更精细的颜色控制
    const coloredAsciiArt = asciiArt.split('\n').map(line => {
        let coloredLine = '';
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            // 根据字符类型应用不同颜色
            if (char === '@' || char === '*' || char === '+' || char === '%') {
                coloredLine += chalk.white(char); // @*+% 符号为白色
            } else if (char === '=' || char === '-' || char === ':' || char === '.') {
                coloredLine += chalk.rgb(35, 110, 255)(char); // 其他符号为RGB(35, 110, 255)蓝色
            } else {
                coloredLine += chalk.white(char);
            }
        }
        return coloredLine;
    }).join('\n');

    // 打印彩色字符画
    console.log(coloredAsciiArt);
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/server-status', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 每30秒发送一次心跳，保持连接活跃
    const interval = setInterval(() => {
        res.write('data: {"status":"online"}\n\n');
    }, 30000);

    // 当客户端断开连接时清除定时器
    req.on('close', () => {
        clearInterval(interval);
    });

    // 发送初始状态
    res.write('data: {"status":"online"}\n\n');
});