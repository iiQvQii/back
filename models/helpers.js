import mongoose from 'mongoose'
import validator from 'validator'

const helperSchema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, '缺少帳號欄位'],
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號必須 20 個字以下'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    maxlength: [15, '姓名必須 15 個字以下']
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ['male', 'female', 'rather not say'],
      message: '性別錯誤'
    }
  },
  birth: {
    type: Date
  },
  tel: {
    type: String,
    maxlength: [10, '連絡電話必須 10 個字以下']
  },
  mobile: {
    type: String,
    required: [true, '缺少手機欄位'],
    minlength: [10, '手機10碼'],
    maxlength: [10, '手機10碼']
  },
  email: {
    type: String,
    required: [true, '缺少欄位'],
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  city: {
    type: String,
    enum: {
      values: ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市', 'Taipei City', 'Keelung City', 'New Taipei City', 'Yilan County', 'Taoyuan City', 'Hsinchu City', 'Hsinchu County', 'Miaoli County',
        'Taichung City', 'Changhua County', 'Nantou County', 'Chiayi City', 'Chiayi County', 'Yunlin County', 'Tainan City', 'Kaohsiung City',
        'Penghu County', 'Kinmen County', 'Pingtung County', 'Taitung County', 'Hualien County', 'Lienchiang County', ''],
      message: '地址縣市錯誤'
    }
  },
  district: {
    type: String,
    enum: {
      values: [
        '中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區', '仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區', '萬里區', '金山區', '板橋區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區', '雙溪區', '貢寮區', '新店區', '坪林區', '烏來區', '永和區', '中和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '新莊區', '泰山區', '林口區', '蘆洲區', '五股區', '八里區', '淡水區', '三芝區', '石門區', '宜蘭市', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '羅東鎮', '三星鄉', '大同鄉', '五結鄉', '冬山鄉', '蘇澳鎮', '南澳鄉', '釣魚臺列嶼', '中壢區', '平鎮區', '龍潭區', '楊梅區', '新屋區', '觀音區', '桃園區', '龜山區', '八德區', '大溪區', '復興區', '大園區', '蘆竹區', '東區', '北區', '香山區', '竹北市', '湖口鄉', '新豐鄉', '新埔鎮', '關西鎮', '芎林鄉', '寶山鄉', '竹東鎮', '五峰鄉', '橫山鄉', '尖石鄉', '北埔鄉', '峨眉鄉', '竹南鎮', '頭份市', '三灣鄉', '南庄鄉', '獅潭鄉', '後龍鎮', '通霄鎮', '苑裡鎮', '苗栗市', '造橋鄉', '頭屋鄉', '公館鄉', '大湖鄉', '泰安鄉', '銅鑼鄉', '三義鄉', '西湖鄉', '卓蘭鎮', '中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '和平區', '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區', '彰化市', '芬園鄉', '花壇鄉', '秀水鄉', '鹿港鎮', '福興鄉', '線西鄉', '和美鎮', '伸港鄉', '員林市', '社頭鄉', '永靖鄉', '埔心鄉', '溪湖鎮', '大村鄉', '埔鹽鄉', '田中鎮', '北斗鎮', '田尾鄉', '埤頭鄉', '溪州鄉', '竹塘鄉', '二林鎮', '大城鄉', '芳苑鄉', '二水鄉', '南投市', '中寮鄉', '草屯鎮', '國姓鄉', '埔里鎮', '仁愛鄉', '名間鄉', '集集鎮', '水里鄉', '魚池鄉', '信義鄉', '竹山鎮', '鹿谷鄉', '東區', '西區', '番路鄉', '梅山鄉', '竹崎鄉', '阿里山', '中埔鄉', '大埔鄉', '水上鄉', '鹿草鄉', '太保市', '朴子市', '東石鄉', '六腳鄉', '新港鄉', '民雄鄉', '大林鎮', '溪口鄉', '義竹鄉', '布袋鎮', '斗南鎮', '大埤鄉', '虎尾鎮', '土庫鎮', '褒忠鄉', '東勢鄉', '台西鄉', '崙背鄉', '麥寮鄉', '斗六市', '林內鄉', '古坑鄉', '莿桐鄉', '西螺鎮', '二崙鄉', '北港鎮', '水林鄉', '口湖鄉', '四湖鄉', '元長鄉', '中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區', '新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區', '楠梓區', '小港區', '左營區', '仁武區', '大社區', '東沙群島', '南沙群島', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區', '馬公市', '西嶼鄉', '望安鄉', '七美鄉', '白沙鄉', '湖西鄉', '金沙鎮', '金湖鎮', '金寧鄉', '金城鎮', '烈嶼鄉', '烏坵鄉', '屏東市', '三地門鄉', '霧台鄉', '瑪家鄉', '九如鄉', '里港鄉', '高樹鄉', '鹽埔鄉', '長治鄉', '麟洛鄉', '竹田鄉', '內埔鄉', '萬丹鄉', '潮州鎮', '泰武鄉', '來義鄉', '萬巒鄉', '崁頂鄉', '新埤鄉', '南州鄉', '林邊鄉', '東港鎮', '琉球鄉', '佳冬鄉', '新園鄉', '枋寮鄉', '枋山鄉', '春日鄉', '獅子鄉', '車城鄉', '牡丹鄉', '恆春鎮', '滿州鄉', '臺東市', '綠島鄉', '蘭嶼鄉', '延平鄉', '卑南鄉', '鹿野鄉', '關山鎮', '海端鄉', '池上鄉', '東河鄉', '成功鎮', '長濱鄉', '太麻里', '金峰鄉', '大武鄉', '達仁鄉', '花蓮市', '新城鄉', '秀林鄉', '吉安鄉', '壽豐鄉', '鳳林鎮', '光復鄉', '豐濱鄉', '瑞穗鄉', '萬榮鄉', '玉里鎮', '卓溪鄉', '富里鄉', '南竿鄉', '北竿鄉', '莒光鄉', '東引鄉', 'Zhongzheng District', 'Datong District', 'Zhongshan District', 'Songshan District', 'Da’an District', 'Wanhua District', 'Xinyi District', 'Shilin District', 'Beitou District', 'Neihu District', 'Nangang District', 'Wenshan District', 'Ren’ai District', 'Xinyi District', 'Zhongzheng District', 'Zhongshan District', 'Anle District', 'Nuannuan District', 'Qidu District', 'Wanli District', 'Jinshan District', 'Banqiao District', 'Xizhi District', 'Shenkeng District', 'Shiding District', 'Ruifang District', 'Pingxi District', 'Shuangxi District', 'Gongliao District', 'Xindian District', 'Pinglin District', 'Wulai District', 'Yonghe District', 'Zhonghe District', 'Tucheng District', 'Sanxia District', 'Shulin District', 'Yingge District', 'Sanchong District', 'Xinzhuang District', 'Taishan District', 'Linkou District', 'LuzhouDistrict', 'Wugu District', 'Bali District', 'Tamsui District', 'Sanzhi District', 'Shimen District', 'Yilan City', 'Toucheng Township', 'Jiaoxi Township', 'Zhuangwei Township', 'Yuanshan Township', 'Luodong Township', 'Sanxing Township', 'Datong Township', 'Wujie Township', 'Dongshan Township', 'Su’ao Township', 'Nan’ao Township', 'Diauyutai', 'Zhongli District', 'Pingzhen District', 'Longtan District', 'Yangmei District', 'Xinwu District', 'Guanyin District', 'Taoyuan District', 'Guishan District', 'Bade District', 'Daxi District', 'Fuxing District', 'Dayuan District', 'Luzhu District', 'East District', 'North District', 'Xiangshan District', 'Zhubei City', 'Hukou Township', 'Xinfeng Township', 'Xinpu Township', 'Guanxi Township', 'Qionglin Township', 'Baoshan Township', 'Zhudong Township', 'Wufeng Township', 'Hengshan Township', 'Jianshi Township', 'Beipu Township', 'Emei Township', 'Zhunan Township', 'Toufen Township', 'Sanwan Township', 'Nanzhuang Township', 'Shitan Township', 'Houlong Township', 'Tongxiao Township', 'Yuanli Township', 'Miaoli City', 'Zaoqiao Township', 'Touwu Township', 'Gongguan Township', 'Dahu Township', 'Tai’an Township', 'Tongluo Township', 'Sanyi Township', 'Xihu Township', 'Zhuolan Township', 'Central District', 'East District', 'South District', 'West District', 'North District', 'Beitun District', 'Xitun District', 'Nantun District', 'Taiping District', 'Dali District', 'Wufeng District', 'Wuri District', 'Fengyuan District', 'Houli District', 'Shigang District', 'Dongshi District', 'Heping District', 'Xinshe District', 'Tanzi District', 'Daya District', 'Shengang District', 'Dadu District', 'ShaluDistrict', 'Longjing District', 'Wuqi District', 'Qingshui District', 'Dajia District', 'Waipu District', 'Da’an District', 'Changhua City', 'Fenyuan Township', 'Huatan Township', 'Xiushui Township', 'Lukang Township', 'Fuxing Township', 'Xianxi Township', 'Hemei Township', 'Shengang Township', 'Yuanlin Township', 'Shetou Township', 'Yongjing Township', 'Puxin Township', 'Xihu Township', 'Dacun Township', 'Puyan Township', 'Tianzhong Township', 'Beidou Township', 'Tianwei Township', 'Pitou Township', 'Xizhou Township', 'Zhutang Township', 'Erlin Township', 'Dacheng Township', 'Fangyuan Township', 'Ershui Township', 'Nantou City', 'Zhongliao Township', 'Caotun Township', 'Guoxing Township', 'Puli Township', 'Ren’ai Township', 'Mingjian Township', 'Jiji Township', 'Shuili Township', 'Yuchi Township', 'Xinyi Township', 'Zhushan Township', 'Lugu Township', 'East District', 'West District', 'FanluTownship', 'Meishan Township', 'Zhuqi Township', 'Alishan Township', 'Zhongpu Township', 'Dapu Township', 'Shuishang Township', 'Lucao Township', 'Taibao City', 'Puzi City', 'Dongshi Township', 'Liujiao Township', 'Xingang Township', 'Minxiong Township', 'Dalin Township', 'Xikou Township', 'Yizhu Township', 'Budai Township', 'Dounan Township', 'Dapi Township', 'Huwei Township', 'Tuku Township', 'Baozhong Township', 'Dongshi Township', 'Taixi Township', 'Lunbei Township', 'Mailiao Township', 'Douliu City', 'Linnei Township', 'Gukeng Township', 'Citong Township', 'Xiluo Township', 'Erlun Township', 'Beigang Township', 'Shuilin Township', 'Kouhu Township', 'Sihu Township', 'Yuanchang Township', 'West Central District', 'East District', 'South District', 'North District', 'Anping District', 'Annan District', 'Yongkang District', 'Guiren District', 'Xinhua District', 'Zuozhen District', 'Yujing District', 'Nanxi District', 'Nanhua District', 'Rende District', 'Guanmiao District', 'Longqi District', 'Guantian District', 'Madou District', 'Jiali District', 'Xigang District', 'Qigu District', 'Jiangjun District', 'Xuejia District', 'Beimen District', 'Xinying District', 'Houbi District', 'Baihe District', 'Dongshan District', 'Liujia District', 'Xiaying District', 'Liuying District', 'Yanshui District', 'Shanhua District', 'Danei District', 'Shanshang District', 'Xinshi District', 'Anding District', 'Xinxing District', 'Qianjin District', 'Lingya District', 'Yancheng District', 'Gushan District', 'Qijin District', 'Qianzhen District', 'Sanmin District', 'Nanzi District', 'Xiaogang District', 'Zuoying District', 'Renwu District', 'Dashe District', 'Dongsha Islands', 'Nansha Islands', 'Gangshan District', 'Luzhu District', 'Alian District', 'Tianliao District', 'Yanchao District', 'Qiaotou District', 'Ziguan District', 'Mituo District', 'Yong’an District', 'Hunei District', 'Fengshan District', 'Daliao District', 'Linyuan District', 'Niaosong District', 'Dashu District', 'Qishan District', 'Meinong District', 'Liugui District', 'Neimen District', 'Shanlin District', 'Jiaxian District', 'Taoyuan District', 'Namaxia District', 'Maolin District', 'Qieding District', 'Magong City', 'Xiyu Township', 'Wang’an Township', 'Qimei Township', 'Baisha Township', 'Huxi Township', 'Jinsha Township', 'Jinhu Township', 'Jinning Township', 'Jincheng Township', 'Lieyu Township', 'Wuqiu Township', 'Pingtung City', 'Sandimen Township', 'Wutai Township', 'Majia Township', 'Jiuru Township', 'Ligang Township', 'Gaoshu Township', 'Yanpu Township', 'Changzhi Township', 'Linluo Township', 'Zhutian Township', 'Neipu Township', 'Wandan Township', 'Chaozhou Township', 'Taiwu Township', 'Laiyi Township', 'Wanluan Township', 'Kanding Township', 'Xinpi Township', 'Nanzhou Township', 'Linbian Township', 'Donggang Township', 'Liuqiu Township', 'Jiadong Township', 'Xinyuan Township', 'Fangliao Township', 'Fangshan Township', 'Chunri Township', 'Shizi Township', 'Checheng Township', 'Mudan Township', 'Hengchun Township', 'Manzhou Township', 'Taitung City', 'Ludao Township', 'Lanyu Township', 'Yanping Township', 'Beinan Township', 'Luye Township', 'Guanshan Township', 'Haiduan Township', 'Chishang Township', 'Donghe Township', 'Chenggong Township', 'Changbin Township', 'Taimali Township', 'Jinfeng Township', 'Dawu Township', 'Daren Township', 'Hualien City', 'Xincheng Township', 'Xiulin Township', 'Ji’an Township', 'Shoufeng Township', 'Fenglin Township', 'Guangfu Township', 'Fengbin Township', 'Ruisui Township', 'Wanrong Township', 'Yuli Township', 'Zhuoxi Township', 'Fuli Township', 'Nangan Township', 'Beigan Township', 'Juguang Township', 'Dongyin Township', ''
      ],
      message: '地址區錯誤'
    }
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  photos: {
    type: String
  },
  role: {
    type: Number,
    required: true,
    default: 2
  },
  tokens: {
    type: [String]
  }
}, { versionKey: false })
export default mongoose.model('heplers', helperSchema)
