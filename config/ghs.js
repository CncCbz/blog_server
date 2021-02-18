//香蕉视频
const LIST = [
  {
    name: 'banana',
    title: '香蕉视频',
    types: [
      '日韩女优',
      '国产',
      '最新',
      '主播',
      '大神',
      '高清无码',
      '偷拍自拍',
      '欧美激情',
      '成人动漫',
      '今日网红',
      '经典三级',
      '麻豆专区',
      '韩国演艺圈',
      '网红主播',
      '台湾特辑',
      '明星换脸',
      '女教师辅导',
      '最新片源',
      'H动漫',
      '中文字幕',
      '重磅热播',
      '剧情',
      '国产高清',
      '大神专区',
      '按摩桑拿',
      '不雅视频',
      'OL',
      '韩国女主播',
      '中文字幕',
      '有码',
      '无码'
    ]
  },
  {
    name: 'b3',
    title: 'b3.cn',
    types: ['最新', '国产', '主播', '大神']
  }
];
const detail = [
  {
    name: 'banana',
    types: [
      { title: '日韩女优', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=日韩女优' },
      { title: '国产', url: 'http://app.xjlb6.com/api.php/app_2/vodList?index_type_id=33' },
      { title: '最新', url: 'http://app.xjlb5.com/api.php/app_2/vodList?index_type_id=29' },
      { title: '主播', url: 'http://app.xjlb6.com/api.php/app_2/vodList?index_type_id=18' },
      { title: '大神', url: 'http://app.xjlb6.com/api.php/app_2/vodList?index_type_id=44' },
      { title: '高清无码', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=高清无码' },
      { title: '偷拍自拍', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=偷拍自拍' },
      { title: '欧美激情', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=欧美激情' },
      { title: '成人动漫', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=成人动漫' },
      { title: '今日网红', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=今日网红' },
      { title: '经典三级', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_big_class=经典三级' },
      { title: '麻豆专区', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=麻豆专区' },
      { title: '韩国演艺圈', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=韩国演艺圈' },
      { title: '网红主播', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=网红主播' },
      { title: '台湾特辑', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=台湾特辑' },
      { title: '明星换脸', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=明星换脸' },
      { title: '女教师辅导', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=女教师辅导' },
      { title: '最新片源', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=最新片源' },
      { title: 'H动漫', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=H动漫' },
      { title: '中文字幕', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=中文字幕' },
      { title: '重磅热播', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=重磅热播' },
      { title: '剧情', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=剧情' },
      { title: '国产高清', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=国产高清' },
      { title: '大神专区', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=大神专区' },
      { title: '按摩桑拿', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=按摩桑拿' },
      { title: '不雅视频', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=不雅视频' },
      { title: 'OL', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=OL' },
      { title: '韩国女主播', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=韩国女主播' },
      { title: '中文字幕', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_year=中文字幕' },
      { title: '有码', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_source=有码' },
      { title: '无码', url: 'http://app.xjlb6.com/api.php/app_2/typeSearch?uid=11425432&vod_class=无码' }
    ],
    baseurl: 'http://app.xjlb5.com/api.php/app_2/lookVod'
  },
  {
    name: 'b3',
    types: [
      { title: '最新', url: 'http://app.xjlb5.com/api.php/app_2/vodList?index_type_id=29&page=1' },
      { title: '国产', url: 'http://app.xjlb5.com/api.php/app_2/vodList?index_type_id=33&page=1' },
      { title: '主播', url: 'http://app.xjlb5.com/api.php/app_2/vodList?index_type_id=18&page=1' },
      { title: '大神', url: 'http://app.xjlb5.com/api.php/app_2/vodList?index_type_id=44&page=1' }
    ],
    baseurl: 'http://app.xjlb5.com/api.php/app_2/lookVod'
  }
];

const ghsConfig = () => LIST;
const ghsList = () => detail;

module.exports = {
  ghsList,
  ghsConfig
};
