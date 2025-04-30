<div align="center">

<img src="https://github.com/user-attachments/assets/a32b5641-602f-4bc3-8d14-856e27a1abd5" alt="favicon" height="44">

Get Xiaomi Watchface

### 从小米官方表盘商店自由获取你想要的表盘

只需三个值[^1],便可从小米官方表盘商店抓取表盘，无需登录账号。

精致 UI 界面 | 批量/单独抓取 | 多机型支持适配

[^1]: 三个值指: [id-start] 起始表盘ID范围, [id-end] 结束表盘ID范围, [model] 设备型号及地区.

</div>

> 该项目仅支持桌面端操作系统，您的系统中必须已安装了 Node.JS 及 NPM

> 该项目不是为小米穿戴设备的普通用户准备的

> [!CAUTION]
> 该项目仅供个人学习和研究使用,请勿用于商业用途。
> 所有表盘资源的版权归原作者所有,请尊重知识产权;通过本工具下载到的表盘资源,请勿进行二次分发、修改或用于商业目的。
> 如因错误使用本工具或通过本工具下载的表盘资源而造成版权或其他法律问题,本工具及作者不承担任何责任。
> 请在使用本工具前自行仔细阅读并遵守相关法律法规。

## 使用方式
你可以手动安装依赖通过 `npm`/`yarn`/`pnpm` 等包管理器手动安装依赖，或者可以执行我们提供的 `initialize.exe` 可执行文件来自动化安装依赖。
```bash
npm install # 或 yarn install 或 pnpm install
```
当一切都准备就绪时，你可以通过以下命令启动服务器：
```bash
node server.js
```
默认启动端口：`3000`

## 设备映射表
#### 小米穿戴设备型号命名规律

<table>
  <tr>
    <th>位置</th>
    <th colspan="2">首字母</th>
    <th>数字第一位</th>
    <th colspan="2">数字第二位</th>
  </tr>
  <tr>
    <td>含义</td>
    <td colspan="2">代表设备发布年份</td>
    <td>暂未明确含义</td>
    <td colspan="2">代表设备系列</td>
  </tr>
  <tr>
    <td rowspan="4">数值</td>
    <td>M</td>
    <td>2023</td>
    <td rowspan="4">6</td>
    <td>2</td>
    <td>Xiaomi Watch S 系列</td>
  </tr>
  <tr>
    <td>N</td>
    <td>2024</td>
    <td>5</td>
    <td>REDMI Watch</td>
  </tr>
  <tr>
    <td>O</td>
    <td>2025</td>
    <td>6</td>
    <td>小米手环标准版 / NFC</td>
  </tr>
  <tr>
    <td colspan="2">以此类推...</td>
    <td>7</td>
    <td>小米手环 Pro</td>
  </tr>
</table>

#### 小米穿戴设备型号信息

<table>
  <tr>
    <th>选项</th>
    <th>型号</th>
    <th>地区</th>
  </tr>
  <tr>
    <td>miwear.watch.m66cn</td>
    <td>小米手环8 / NFC</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>lchz.watch.m67</td>
    <td rowspan="2">小米手环 8 Pro</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>lchz.watch.m67ys</td>
    <td></td>
  </tr>
  <tr>
    <td>mijia.watch.n62</td>
    <td>Xiaomi Watch S3</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>lchz.watch.n65</td>
    <td>Redmi Watch 4</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>miwear.watch.n66cn</td>
    <td rowspan="2">小米手环9 / NFC</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>miwear.watch.n66tc</td>
    <td></td>
  </tr>
  <tr>
    <td>miwear.watch.n67cn</td>
    <td rowspan="2">小米手环9 Pro</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>miwear.watch.n67gl</td>
    <td>全球(环大陆)</td>
  </tr>
  <tr>
    <td>miwear.watch.n69cn</td>
    <td rowspan="2">小米手环 9 Active</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>miwear.watch.n69gl</td>
    <td>全球(环大陆)</td>
  </tr>
  <tr>
    <td>mijia.watch.o62</td>
    <td rowspan="3">Xiaomi Watch S4</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>mijia.watch.o62m</td>
    <td></td>
  </tr>
  <tr>
    <td>mijia.watch.o62gl</td>
    <td>全球(环大陆)</td>
  </tr>
  <tr>
    <td>miwear.watch.o65</td>
    <td rowspan="3">REDMI Watch 5</td>
    <td>中国</td>
  </tr>
  <tr>
    <td>miwear.watch.o65m</td>
    <td></td>
  </tr>
  <tr>
    <td>miwear.watch.o65w</td>
    <td></td>
  </tr>
  <tr>
    <td>miwear.watch.o66cn</td>
    <td>小米手环10 / NFC</td>
    <td>中国</td>
  </tr>
</table>

上表中部分设备可能还未发布，但型号已经可以在小米服务器上找到，我们强烈不建议您获取这些设备的表盘并发布、使用或者进行商用活动。
