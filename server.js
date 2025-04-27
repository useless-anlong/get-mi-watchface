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
                    `<span style="color: #44e4a4;">[ HTTP 200 OK ]</span> ID ${id} in ${model} has been added to the list.` :
                    `<span style="color: #B8B8B8;">[   -8 NULL   ]</span> Could not find watchface for ID ${id} in model ${model}.`
            })}\n\n`);
        } catch (error) {
            res.write(`data: ${JSON.stringify({
                type: 'log',
                status: 'error',
                id: id,
                message: `<span style="color: #FF6666;">[ FETCH ERROR ]</span> Error: ID ${id} at ${model}, ${error.message}`
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
