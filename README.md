# 文尚 & 邓旖 · 婚礼邀请函

婚礼日期：2026年11月15日 12:00。

## 修改寄语和婚礼信息

在 GitHub 打开 `config.js`，点击编辑铅笔。修改 `invitationText` 等字段，保留引号与逗号，然后点击 Commit changes 保存。Pages 会自动更新，分享链接不变。

## 添加婚纱照

1. 在 `assets` 中上传照片，建议命名为 `wedding-01.jpg` 等英文文件名，每张尽量不超过 1 MB。
2. 编辑 `config.js`，将 `photos: []` 改为：

```js
photos: [
  { src: './assets/wedding-01.jpg', alt: '我们的婚纱照' },
  { src: './assets/wedding-02.jpg', alt: '我们的幸福回忆' },
],
```

3. 修改 `index.html` 中 `config.js?v=...` 的版本号，例如改成 `config.js?v=photos-1`，避免旧缓存。
4. 保存后等待 Pages 部署完成，用手机刷新检查。婚纱照仍由集齐六个祝尼魔解锁。

## 宾客登记

姓名、电话、留言只保存在访客浏览器的 localStorage，不发送到服务器。新人不会收到报名通知。

## 素材

游戏相关素材权利属于 ConcernedApe 等对应权利人；音乐、参考视频和截图由项目使用者提供。像素字体 Fusion Pixel Font 使用 SIL OFL 1.1，许可见 assets/fonts/OFL.txt。
