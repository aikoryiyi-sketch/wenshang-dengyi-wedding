/**
 * ================================================================
 *  新手只需要修改这个文件。其他文件不要动，也能完成一份婚礼邀请函。
 *  修改引号里的文字即可；每一行末尾的英文逗号请保留。
 * ================================================================
 */

window.WEDDING_INVITATION = {
  // Add local wedding photos to the photos array using src and alt.
  photos: [],
  // 1. 新郎与新娘信息（占位符）
  heroName: '文尚 & 邓旖',
  englishName: 'WEN SHANG & DENG YI',

  // 2. 时间：dateTime 用于倒计时，必须保持 2026-11-15T12:00:00+08:00 这种格式
  dateTime: '2026-11-15T12:00:00+08:00',
  dateLabel: '2026年11月15日 · 星期日',
  dateShort: '2026.11.15',
  timeLabel: '12:00 宴席',

  // 3. 地点与导航
  venue: '宁乡市江天·呈宫殿（翡翠湖国际广场店）',
  venueShort: '宁乡 · 江天·呈宫殿',
  coordinateLabel: 'OUR WEDDING DESTINATION',
  transport: '交通、停车与接送说明待补充；可先点击下方地图查看路线。',
  mapUrl: 'https://surl.amap.com/fdy5O6n3ZZ',

  // 4. 主文案
  questTitle: '参加文尚与邓旖的婚礼',
  invitationText: '【给宾客的话待补充】在这个秋天，我们即将开启双人生活，期待你来到我们的幸福小天地。',
  giftNotice: '【温馨提示待补充】',
  endingTitle: '余生四季，一起耕耘',

  // 5. 当天流程：可以增加或删除整组 { ... }
  schedule: [
    { time: '12:00', title: '宴席', detail: '与文尚、邓旖一起分享幸福时刻', stars: '★★★' },
  ],

  // 8. 用户提供的音乐：Summer (Nature's Crescendo)，本地播放
  musicEnabled: true,
  musicUrl: './assets/summer-natures-crescendo.mp3',
  musicHint: '播放 / 暂停音乐',

  // 9. 宾客登记仅为本机演示：内容只保存在访客自己的浏览器中，不会上传
}
