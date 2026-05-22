import { Kimono, KimonoColor, Background, KimonoPattern, StylePreset } from './types';

export const KIMONO_OPTIONS: Kimono[] = [
  { id: 'furisode', name: '振袖', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/furisode-kimono-thumbnail.png', description: '未婚女性の第一礼装である、長く華やかな袖が特徴の着物です。(A formal kimono with long, flowing sleeves, typically worn by unmarried young women.)' },
  { id: 'tomesode', name: '留袖', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/tomesode-kimono-thumbnail.png', description: '既婚女性の第一礼装で、黒地に裾部分だけに模様が入った格調高い着物です。(A formal kimono for married women, black with patterns only below the waistline.)' },
  { id: 'yukata', name: '浴衣', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/yukata-kimono-thumbnail.png', description: '夏祭りや花火大会などで着られる、涼しげでカジュアルな夏の着物です。(A light and casual summer kimono, often worn for summer festivals and fireworks.)' },
];

export const COLOR_OPTIONS: KimonoColor[] = [
  { id: 'red', name: 'Red', twColor: 'bg-red-500' },
  { id: 'pink', name: 'Pink', twColor: 'bg-pink-400' },
  { id: 'blue', name: 'Blue', twColor: 'bg-blue-500' },
  { id: 'purple', name: 'Purple', twColor: 'bg-purple-500' },
  { id: 'green', name: 'Green', twColor: 'bg-green-500' },
  { id: 'black', name: 'Black', twColor: 'bg-gray-800' },
  { id: 'white', name: 'White', twColor: 'bg-white' },
  { id: 'gold', name: 'Gold', twColor: 'bg-yellow-400' },
];

export const KIMONO_PATTERN_OPTIONS: KimonoPattern[] = [
  { id: 'botan', name: '牡丹', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/botan.png', description: '豪華で美しい牡丹の花。富貴や幸福を象徴します。(Gorgeous and beautiful peony flowers, symbolizing wealth and happiness.)' },
  { id: 'chou', name: '蝶', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/chou.png', description: '優雅に舞う蝶の姿。長寿や夫婦円満を意味します。(Elegant dancing butterflies, signifying longevity and marital harmony.)' },
  { id: 'ichimatsu', name: '市松', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/ichimatsu.png', description: '色違いの正方形を交互に並べた格子模様。子孫繁栄を象徴します。(A checkered pattern of alternating colored squares, symbolizing the prosperity of descendants.)' },
  { id: 'kasumi', name: '霞', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/kasumi.png', description: '春の霞がたなびく様子を図案化した模様。優雅で幻想的な雰囲気を醸し出します。(A pattern depicting spring haze, creating an elegant and fantastic atmosphere.)' },
  { id: 'komon', name: '小紋', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/komon.png', description: '着物全体に細かい模様を繰り返し染めたもの。おしゃれで粋な印象を与えます。(A pattern with fine repeating designs dyed over the entire kimono, giving a stylish and chic impression.)' },
  { id: 'mari', name: '毬', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/mari.png', description: '色とりどりの糸でかがった美しい手毬の模様。子供の健やかな成長を願う意味があります。(A beautiful pattern of colorful stitched handballs, signifying wishes for a child\'s healthy growth.)' },
  { id: 'momiji', name: '紅葉', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/momiji.png', description: '秋の美しさを象徴する紅葉の葉。長寿を意味する吉祥文様です。(Maple leaves symbolizing the beauty of autumn. An auspicious pattern signifying longevity.)' },
  { id: 'ougi', name: '扇', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/ougi.png', description: '末広がりで縁起が良いとされる扇の模様。(A fan pattern, considered auspicious as it spreads out, symbolizing a prosperous future.)' },
  { id: 'ryuusui', name: '流水', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/ryuusui.png', description: '流れる水を図案化した模様。厄を流し、清める意味があります。(A pattern of flowing water, symbolizing the washing away of misfortune and purification.)' },
  { id: 'sakura', name: '桜', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/sakura.png', description: '日本を象徴する花、桜。豊かさや繁栄を意味します。(Cherry blossoms, the symbolic flower of Japan, representing abundance and prosperity.)' },
  { id: 'seigaiha', name: '青海波', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/seigaiha.png', description: '穏やかな波がどこまでも続く様子を表す模様。未来永劫の平穏を願う意味があります。(A pattern representing endless calm waves, signifying wishes for eternal peace.)' },
  { id: 'shima', name: '縞', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/shima.png', description: 'シンプルで粋な縞模様。まっすぐな筋を通すという意味も。(Simple and chic stripes. It can also imply straightforwardness.)' },
  { id: 'usagi', name: '兎', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/usagi.png', description: '前にしか進まない性質から、飛躍や前進を象徴する縁起の良い動物。(Rabbits, known for only moving forward, are auspicious animals symbolizing progress and leaps forward.)' },
  { id: 'yagasuri', name: '矢絣', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/yagasuri.png', description: '矢羽をモチーフにした模様。一度射ると戻らないことから、嫁入りの際に縁起の良い柄とされた。(A pattern based on arrow fletchings. Since an arrow, once shot, never returns, it was considered an auspicious pattern for a bride.)' },
  { id: 'fuji', name: '藤', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/fuji.png', description: '優雅で美しい藤の花の模様。歓迎や優しさを象徴します。(Elegant and beautiful wisteria flower pattern, symbolizing welcome and gentleness.)' },
  { id: 'tsubaki', name: '椿', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/tsubaki.png', description: '冬に咲く美しい椿の花。控えめな美しさや誇りを象徴します。(Beautiful camellia flowers that bloom in winter, symbolizing modest beauty and pride.)' },
  { id: 'ume', name: '梅', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/ume.png', description: '早春に咲く梅の花。忍耐力や生命力を象徴する縁起の良い柄です。(Plum blossoms that bloom in early spring. An auspicious pattern symbolizing patience and vitality.)' },
  { id: 'yukata_asagao', name: '朝顔（浴衣用）', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/%E3%83%BBasagao.png', description: '夏の朝を彩る朝顔の模様。浴衣に涼しげな印象を与えます。(Morning glory pattern that colors the summer morning. Gives a cool impression to the yukata.)' },
  { id: 'yukata_himawari', name: '向日葵（浴衣用）', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/%E3%83%BBhimawari.png', description: '太陽のように明るい向日葵の模様。元気で活発な印象を与えます。(Bright sunflower pattern like the sun. Gives a cheerful and active impression.)' },
  { id: 'yukata_kingyo', name: '金魚（浴衣用）', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/%E3%83%BBkinngyo.png', description: '水の中を優雅に泳ぐ金魚の模様。涼やかで夏らしい人気の柄です。(Pattern of goldfish swimming gracefully in the water. A popular cool and summery design.)' },
  { id: 'yukata_mizutama', name: '水玉（浴衣用）', imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/%E3%83%BBmizutama.png', description: 'シンプルで可愛らしい水玉模様。どんな色の浴衣にも合わせやすい定番の柄です。(Simple and cute polka dot pattern. A classic design that is easy to match with any color of yukata.)' },
];

export const BACKGROUND_OPTIONS: Background[] = [
  { id: 'giontatsumibashi_haru', name: '祇園巽橋・春', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/001-giontatsumibashi-haru.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/001-giontatsumibashi-haru.jpg', description: '「祇園巽橋・春」の美しい風景。' },
  { id: 'giontatsumibashi_aki', name: '祇園巽橋・秋', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/002-giontatsumibashi-aki.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/002-giontatsumibashi-aki.jpg', description: '「祇園巽橋・秋」の美しい風景。' },
  { id: 'gion_shirakawa', name: '祇園・白川', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/gion-shirakawa.webp', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/gion-shirakawa.webp', description: '「祇園・白川」の美しい風景。' },
  { id: 'husimiinari_sennbonntorii', name: '伏見稲荷千本鳥居', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/003-husimiinari-sennbonntorii.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/003-husimiinari-sennbonntorii.jpg', description: '「伏見稲荷千本鳥居」の美しい風景。' },
  { id: 'kihunejinnja', name: '貴船神社', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/004-kihunejinnja.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/004-kihunejinnja.jpg', description: '「貴船神社」の美しい風景。' },
  { id: 'ooharasannzenin', name: '大原三千院', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/ooharasannzenin.webp', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/ooharasannzenin.webp', description: '「大原三千院」の美しい風景。' },
  { id: 'kiyomizudera_haru', name: '清水寺・春', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/005-kiyomizudera-haru.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/005-kiyomizudera-haru.png', description: '「清水寺・春」の美しい風景。' },
  { id: 'kiyomizudera_aki', name: '清水寺・秋', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/006-kiyomizudera-aki.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/006-kiyomizudera-aki.png', description: '「清水寺・秋」の美しい風景。' },
  { id: 'arashiyama_haru', name: '嵐山・春', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/007-arashiyama-haru.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/007-arashiyama-haru.jpg', description: '「嵐山・春」の美しい風景。' },
  { id: 'arashiyama_aki', name: '嵐山・秋', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/Generated%20Image%20September%2028%2C%202025%20-%208_48AM.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/Generated%20Image%20September%2028%2C%202025%20-%208_48AM.png', description: '「嵐山・秋」の美しい風景。' },
  { id: 'arashiyamachikurin', name: '嵐山竹林', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/009-arashiyamachikurin.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/009-arashiyamachikurin.jpg', description: '「嵐山竹林」の美しい風景。' },
  { id: 'shimogamojinja', name: '下鴨神社', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/shimogamojinja.webp', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/shimogamojinja.webp', description: '「下鴨神社」の美しい風景。' },
  { id: 'hiranojinja', name: '平野神社', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/hiranojinja.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/hiranojinja.png', description: '「平野神社」の美しい風景。' },
  { id: 'ponntochou', name: '先斗町', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/010-ponntochou.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/010-ponntochou.jpg', description: '「先斗町」の美しい風景。' },
  { id: 'gionishibekouji', name: '祇園石塀小路', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/011-gionishibekouji.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/011-gionishibekouji.jpg', description: '「祇園石塀小路」の美しい風景。' },
  { id: 'gionhanamikouji', name: '祇園花見小路', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/012-gion.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/012-gion.jpg', description: '「祇園花見小路」の美しい風景。' },
  { id: 'kinnkakuji_aki', name: '金閣寺・秋', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/013-kinnkakuji-aki.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/013-kinnkakuji-aki.jpg', description: '「金閣寺・秋」の美しい風景。' },
  { id: 'kinnkakuji_huyu', name: '金閣寺・冬', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/014-kinnkakuji-huyu.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/014-kinnkakuji-huyu.jpg', description: '「金閣寺・冬」の美しい風景。' },
  { id: 'ginkakuji', name: '銀閣寺', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/015-ginkakuji.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/015-ginkakuji.jpg', description: '「銀閣寺」の美しい風景。' },
  { id: 'sakuranamiki_1', name: '桜並木１', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/016-sakuranamiki%201.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/016-sakuranamiki%201.png', description: '「桜並木１」の美しい風景。' },
  { id: 'sakuranamiki_2', name: '桜並木２', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/017-sakuranamiki%202.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/017-sakuranamiki%202.png', description: '「桜並木２」の美しい風景。' },
  { id: 'sakuranamiki_3', name: '桜並木３', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/018-sakuranamiki%203.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/018-sakuranamiki%203.png', description: '「桜並木３」の美しい風景。' },
  { id: 'ichounamiki', name: '銀杏並木', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/019-ichounamiki.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/019-ichounamiki.png', description: '「銀杏並木」の美しい風景。' },
  { id: 'kiyomizu_yasaka_no_tou', name: '清水八坂の塔', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/020-yasaka-no-tou.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/020-yasaka-no-tou.jpg', description: '「清水八坂の塔」の美しい風景。' },
  { id: 'kiyomizu_sanneizaka', name: '清水産寧坂', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/021-kiyomizuninennzaka.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/021-kiyomizuninennzaka.jpg', description: '「清水産寧坂」の美しい風景。' },
  { id: 'kiyomizu_ninenzaka', name: '清水二年坂', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/022-kiyomizusannneizaka.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/022-kiyomizusannneizaka.jpg', description: '「清水二年坂」の美しい風景。' },
  { id: 'ryouanjisekitei', name: '龍安寺石庭', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/023-ryouanjisekitei.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/023-ryouanjisekitei.jpg', description: '「龍安寺石庭」の美しい風景。' },
  { id: 'nanohanabatake', name: '菜の花畑', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/024-nanohanabatake.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/024-nanohanabatake.jpg', description: '「菜の花畑」の美しい風景。' },
  { id: 'saihouji_kokedera', name: '西芳寺（苔寺）', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/025-saihouji(kokedera).jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/025-saihouji(kokedera).jpg', description: '「西芳寺（苔寺）」の美しい風景。' },
  { id: 'imamiyajinnja', name: '今宮神社', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/026-imamiyajinnja.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/026-imamiyajinnja.jpg', description: '「今宮神社」の美しい風景。' },
  { id: 'jinnja', name: '神社', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/027-jinnja.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/027-jinnja.png', description: '「神社」の美しい風景。' },
  { id: 'ochashitu', name: 'お茶室', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/028-ochashitu.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/028-ochashitu.jpg', description: '「お茶室」の美しい風景。' },
  { id: 'ohpunkafe_1', name: 'オープン・カフェ１', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/029-ohpunkafe%201.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/029-ohpunkafe%201.png', description: '「オープン・カフェ１」の美しい風景。' },
  { id: 'ohpunkafe_2', name: 'オープン・カフェ２', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/030-ohpunkafe%202.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/030-ohpunkafe%202.png', description: '「オープン・カフェ２」の美しい風景。' },
  { id: 'louis_vuitton', name: 'ルイ・ヴィトン', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/031-louis-vuitton.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/031-louis-vuitton.jpg', description: '「ルイ・ヴィトン」の美しい風景。' },
  { id: 'koubemotomachi', name: '神戸元町', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/032-koubemotomachi.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/032-koubemotomachi.jpg', description: '「神戸元町」の美しい風景。' },
  { id: 'bijutukan', name: '美術館', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/033-bijutukan.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/033-bijutukan.png', description: '「美術館」の美しい風景。' },
  { id: 'wagashiyasan', name: '和菓子屋さん', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/034-wagashiyasan.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/034-wagashiyasan.jpg', description: '「和菓子屋さん」の美しい風景。' },
  { id: 'hoteru_huronto', name: 'ホテル・フロント', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/035-hoteru-huronto.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/035-hoteru-huronto.png', description: '「ホテル・フロント」の美しい風景。' },
  { id: 'satsueisutajio', name: '撮影スタジオ', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/036-satsueisutajio.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/036-satsueisutajio.png', description: '「撮影スタジオ」の美しい風景。' },
  { id: 'niwa', name: '庭', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/037-niwa.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/037-niwa.jpg', description: '「庭」の美しい風景。' },
  { id: 'hanabitaikai', name: '花火大会', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/038-hanabitaikai.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/038-hanabitaikai.jpg', description: '「花火大会」の美しい風景。' },
  { id: 'gionmatsuri_yoiyama', name: '祇園祭宵山', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/039-gionmatsuri-yoiyama.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/039-gionmatsuri-yoiyama.jpg', description: '「祇園祭宵山」の美しい風景。' },
  { id: 'kinngyosukui', name: '金魚すくい', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/040-kinngyosukui.png', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/040-kinngyosukui.png', description: '「金魚すくい」の美しい風景。' },
  { id: 'himawari_batake', name: 'ひまわり畑', thumbnailUrl: 'https://storage.googleapis.com/aiai-bucket-467108/202007_kanto_3-2_003.jpg', imageUrl: 'https://storage.googleapis.com/aiai-bucket-467108/202007_kanto_3-2_003.jpg', description: '「ひまわり畑」の美しい風景。' },
];


export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'kyoto_bijin',
    name: 'はんなり京美人風',
    imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/preset-kyoto-bijin.jpg',
    description: '古都の風景に溶け込む、上品で落ち着いたスタイルです。',
    settings: {
      colorId: 'purple',
      patternId: 'ryuusui',
      backgroundId: 'giontatsumibashi_haru',
      kimonoId: 'furisode',
      pose: '和傘をそっと持ち、少しだけはにかむように微笑んで。'
    }
  },
  {
    id: 'matsuri_musume',
    name: '元気な夏祭り娘風',
    imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/preset-matsuri-musume.jpg',
    description: '鮮やかな色合いで、お祭りの楽しさが伝わるスタイルです。',
    settings: {
      colorId: 'red',
      patternId: 'ougi',
      backgroundId: 'husimiinari_sennbonntorii',
      kimonoId: 'furisode',
      pose: 'うちわを片手に、楽しそうな笑顔で少し見上げる感じ。'
    }
  },
  {
    id: 'taisho_roman',
    name: '大正ロマン風',
    imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/preset-taisho-roman.jpg',
    description: 'レトロでモダンな、どこか懐かしい雰囲気のスタイルです。',
    settings: {
      colorId: 'blue',
      patternId: 'yagasuri',
      backgroundId: 'gionishibekouji',
      kimonoId: 'furisode',
      pose: '日傘をさして、少しアンニュイな表情で遠くを見つめる。'
    }
  },
  {
    id: 'seijinshiki_gorgeous',
    name: '豪華絢爛な成人式風',
    imageUrl: 'https://storage.googleapis.com/my-aiai-bucket/preset-seijinshiki.jpg',
    description: '人生の節目を祝う、華やかで格調高いスタイルです。',
    settings: {
      colorId: 'gold',
      patternId: 'botan',
      backgroundId: 'kinnkakuji_aki',
      kimonoId: 'furisode',
      pose: '両手を前でそっと重ね、まっすぐ前を見て、晴れやかな笑顔で。'
    }
  },
];

export const RANDOM_POSE_SUGGESTIONS: readonly string[] = [
  "少しはにかんだ笑顔で。",
  "遠くを見つめるような、少し物憂げな表情で。",
  "楽しそうに、こちらに手を振って。",
  "風に髪がなびく中で、凛とした立ち姿。",
  "袖を少し持ち上げて、優雅に歩き出すようなポーズ。",
  "お茶を一口飲むような、落ち着いた仕草。",
  "後ろを振り返り、にっこりと微笑んで。",
  "扇子をそっと広げて、顔を少し隠すように。",
];