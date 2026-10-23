# 올라무비 — 결혼스냅 · 첫돌스냅 공식 사이트

参考 forestfilm.co.kr 的结构与极简婚礼影像风格制作的韩语单页站点。作品按 `결혼스냅` / `첫돌스냅` 分类，并各自分为 `영상` / `사진`。联系方式已按提供的信息更新，套餐和部分数据仍为占位内容；作品区使用占位色块，后续可直接替换为真实照片与影片。

## 预览

直接双击 `index.html` 即可打开。也可以在当前目录启动本地服务：

```bash
python3 -m http.server 8787
```

然后访问 `http://localhost:8787`。

站点为韩语单语版本，右上角不再显示语言切换。

## 文件结构

```text
aura-film/
├── index.html      页面结构
├── styles.css      视觉与响应式布局
├── script.js       筛选、弹窗、表单、移动菜单
├── assets/
│   ├── mark.png                 透明底 LOGO 图标
│   ├── logo-full.png            完整 LOGO（OG 分享图用）
│   ├── logo-full-transparent.png 透明底完整 LOGO（介绍区用）
│   ├── logo-lockup-on-dark.png  深色首屏用 LOGO（白色字标）
│   ├── logo-lockup-on-light.png 浅色滚动头部用 LOGO（深色字标）
│   └── wechat-qr.png            微信二维码
└── README.md
```

`preview/` 目录里放了桌面和移动端的效果截图，方便直接发给客户或朋友看。

顶部 LOGO 使用 `logo-lockup-on-dark.png`，页面滚动、头部变浅后自动切换为 `logo-lockup-on-light.png`。替换品牌时同时更新这两张图即可。

## 作品分类

作品区共 12 张卡片，四个分类各 3 张：

- `결혼스냅 · 영상` — `data-cat="wedding-video"`
- `결혼스냅 · 사진` — `data-cat="wedding-photo"`
- `첫돌스냅 · 영상` — `data-cat="baby-video"`
- `첫돌스냅 · 사진` — `data-cat="baby-photo"`

筛选按钮的 `data-filter` 与卡片的 `data-cat` 对应。增加作品时复制一张 `.p-card`，修改 `data-cat`、标题、说明和色值即可；超过 3 张也能正常显示，筛选时会自动按数量调整网格。

## 替换作品图

作品卡片在 `index.html` 的 `#portfolioGrid` 里。每张卡片的 `.p-media` 目前使用 CSS 渐变色块。替换时有两种方式。

方式一，把图片放进 `assets/portfolio/`，然后在对应的 `.p-media` 内加一行：

```html
<div class="p-media">
  <img src="assets/portfolio/wedding-01.jpg" alt="Grand Hall wedding film">
  <span class="p-num">01</span>
  ...
</div>
```

方式二，直接在 `.p-media` 上写背景图：

```html
<div class="p-media" style="background-image:url('assets/portfolio/wedding-01.jpg');background-size:cover;background-position:center">
```

弹窗会自动复制卡片里的图片或背景，不需要另外维护一份。

## 替换首屏视觉

首屏目前是 CSS 渐变的占位氛围图。要换成真实照片或影片封面，把 `styles.css` 里的 `.hero-photo` 改成：

```css
.hero-photo {
  background-image: url("assets/hero.jpg");
  background-size: cover;
  background-position: center;
  filter: none;
  opacity: 1;
}
```

如果要用视频，可以在 `index.html` 的 `.hero-bg` 里放一个 `<video>`，保持 `autoplay muted loop playsinline`，并给它加上 `position:absolute; inset:0; width:100%; height:100%; object-fit:cover`。

## 修改文案与套餐

所有韩文文案直接写在 `index.html`。联系电话、邮箱、地址、银行账户、页脚信息也在 `index.html`；套餐名称和四条包含内容分别在 `#product` 下的四个 `.package` 里。

## 预约联系方式

预约区只保留电话 / 微信、微信二维码、地址、地图和营业时间，不再包含表单。

- 电话 / 微信：`13043397733`
- 地址：`延吉市北大新城一号商务楼5楼506号`
- 营业时间：`AM 8:00 – PM 5:00`
- 二维码：`assets/wechat-qr.png`（透明背景，直接放在页面奶油色背景上）
- 地图：`위치 보기` 链接到高德地图搜索

QR 下方不设置单独卡片背景，直接透出页面奶油色背景。替换二维码时保留足够的透明/浅色留白，扫码识别会更稳定。

## 备注

- 原站仅作为版式与功能参考，当前站点的文案、品牌和占位素材均为独立内容。
- `10+ / 500+ / 4K / 1:1` 等数字是占位值，上线前请替换为真实数据。
- 头图、作品区和样片区都是占位视觉，建议上线前换成真实婚礼 / 周岁照片与视频封面。

## 上线前检查

- 确认电话、微信、地址、营业时间和营业执照号。
- 替换四条套餐的机位、时长、交付内容和真实价格说明。
- 把 `10+ / 500+ / 4K / 1:1` 换成真实数据。
- 把 `og:image` 改成部署后的完整网址，社交平台才能正确抓取封面。
- 确认电话、微信、地址、营业时间和二维码均为最新信息。
- 用手机实际打开一次，确认韩文文案、菜单、四个分类筛选和表单都正常。
