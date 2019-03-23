/// <reference path="app/model/main.ts" />
/* SystemJS module definition */
type fn = (msg: any, options?: any) => any;

interface Icons {
  album: HTMLObjectElement;
  ban: HTMLObjectElement;
  behance: HTMLObjectElement;
  bell: HTMLObjectElement;
  bold: HTMLObjectElement;
  bolt: HTMLObjectElement;
  bookmark: HTMLObjectElement;
  calendar: HTMLObjectElement;
  camera: HTMLObjectElement;
  cart: HTMLObjectElement;
  check: HTMLObjectElement;
  clock: HTMLObjectElement;
  close: HTMLObjectElement;
  code: HTMLObjectElement;
  cog: HTMLObjectElement;
  comment: HTMLObjectElement;
  commenting: HTMLObjectElement;
  comments: HTMLObjectElement;
  copy: HTMLObjectElement;
  database: HTMLObjectElement;
  desktop: HTMLObjectElement;
  download: HTMLObjectElement;
  dribbble: HTMLObjectElement;
  expand: HTMLObjectElement;
  facebook: HTMLObjectElement;
  file: HTMLObjectElement;
  flickr: HTMLObjectElement;
  folder: HTMLObjectElement;
  forward: HTMLObjectElement;
  foursquare: HTMLObjectElement;
  future: HTMLObjectElement;
  github: HTMLObjectElement;
  gitter: HTMLObjectElement;
  google: HTMLObjectElement;
  grid: HTMLObjectElement;
  happy: HTMLObjectElement;
  hashtag: HTMLObjectElement;
  heart: HTMLObjectElement;
  history: HTMLObjectElement;
  home: HTMLObjectElement;
  image: HTMLObjectElement;
  info: HTMLObjectElement;
  instagram: HTMLObjectElement;
  italic: HTMLObjectElement;
  joomla: HTMLObjectElement;
  laptop: HTMLObjectElement;
  lifesaver: HTMLObjectElement;
  link: HTMLObjectElement;
  linkedin: HTMLObjectElement;
  list: HTMLObjectElement;
  location: HTMLObjectElement;
  lock: HTMLObjectElement;
  mail: HTMLObjectElement;
  menu: HTMLObjectElement;
  minus: HTMLObjectElement;
  more: HTMLObjectElement;
  move: HTMLObjectElement;
  nut: HTMLObjectElement;
  pagekit: HTMLObjectElement;
  pencil: HTMLObjectElement;
  phone: HTMLObjectElement;
  pinterest: HTMLObjectElement;
  play: HTMLObjectElement;
  plus: HTMLObjectElement;
  pull: HTMLObjectElement;
  push: HTMLObjectElement;
  question: HTMLObjectElement;
  receiver: HTMLObjectElement;
  refresh: HTMLObjectElement;
  reply: HTMLObjectElement;
  rss: HTMLObjectElement;
  search: HTMLObjectElement;
  server: HTMLObjectElement;
  settings: HTMLObjectElement;
  shrink: HTMLObjectElement;
  social: HTMLObjectElement;
  soundcloud: HTMLObjectElement;
  star: HTMLObjectElement;
  strikethrough: HTMLObjectElement;
  table: HTMLObjectElement;
  tablet: HTMLObjectElement;
  tag: HTMLObjectElement;
  thumbnails: HTMLObjectElement;
  trash: HTMLObjectElement;
  tripadvisor: HTMLObjectElement;
  tumblr: HTMLObjectElement;
  tv: HTMLObjectElement;
  twitter: HTMLObjectElement;
  uikit: HTMLObjectElement;
  unlock: HTMLObjectElement;
  upload: HTMLObjectElement;
  user: HTMLObjectElement;
  users: HTMLObjectElement;
  vimeo: HTMLObjectElement;
  warning: HTMLObjectElement;
  whatsapp: HTMLObjectElement;
  wordpress: HTMLObjectElement;
  world: HTMLObjectElement;
  xing: HTMLObjectElement;
  yelp: HTMLObjectElement;
  youtube: HTMLObjectElement;
  "arrow-down": HTMLObjectElement;
  "arrow-left": HTMLObjectElement;
  "arrow-right": HTMLObjectElement;
  "arrow-up": HTMLObjectElement;
  "chevron-down": HTMLObjectElement;
  "chevron-left": HTMLObjectElement;
  "chevron-right": HTMLObjectElement;
  "chevron-up": HTMLObjectElement;
  "cloud-download": HTMLObjectElement;
  "cloud-upload": HTMLObjectElement;
  "credit-card": HTMLObjectElement;
  "file-edit": HTMLObjectElement;
  "git-branch": HTMLObjectElement;
  "git-fork": HTMLObjectElement;
  "github-alt": HTMLObjectElement;
  "google-plus": HTMLObjectElement;
  "minus-circle": HTMLObjectElement;
  "more-vertical": HTMLObjectElement;
  "paint-bucket": HTMLObjectElement;
  "phone-landscape": HTMLObjectElement;
  "play-circle": HTMLObjectElement;
  "plus-circle": HTMLObjectElement;
  "quote-right": HTMLObjectElement;
  "sign-in": HTMLObjectElement;
  "sign-out": HTMLObjectElement;
  "tablet-landscape": HTMLObjectElement;
  "triangle-down": HTMLObjectElement;
  "triangle-left": HTMLObjectElement;
  "triangle-right": HTMLObjectElement;
  "triangle-up": HTMLObjectElement;
  "video-camera": HTMLObjectElement;
}

declare namespace UIkit {
  const use: fn;
  // const lightbox: fn;
  // const autocomplete: fn;
  const alert: fn;
  // const datepicker: fn;
  const drop: fn;
  // const dropdown: fn;
  const countdown: fn;
  const cover: fn;
  const formCustom: fn;
  const icon: fn;
  // const htmleditor: fn;
  const margin: fn;
  // const modal: fn;
  const nav: fn;
  const navbar: fn;
  // const slider: fn;
  // const slideset: fn;
  // const slideshow: fn;
  // const parallax: fn;
  // const accordion: fn;
  const notification: fn;
  // const nestable: fn;
  // const offcanvas: fn;
  const scroll: fn;
  const scrollspy: fn;
  // const search: fn;
  // const sortable: fn;
  // const sticky: fn;
  const switcher: fn;
  const tab: fn;
  // const timepicker: fn;
  const toggle: fn;
  // const tooltip: fn;
  const upload: fn;
}

declare let Icons: Icons;

declare module "uikit" {
  export = UIkit;
}

declare module "uikit/dist/js/uikit" {
  export = UIkit;
}

declare module "uikit/dist/js/uikit-icons" {
  export = Icons;
}

interface User {
  login?: string,
  email: string,
  password: string,
  repeatPassword?: string
}

interface RegistrationFormState {
  login: boolean,
  email: boolean,
  password: boolean,
  repeatPassword: boolean
}

interface ServerError {
  status: number|null,
  msgs: Array<string>
}
