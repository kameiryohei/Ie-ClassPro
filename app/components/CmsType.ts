export type Image = {
  url: string;
  height: number;
  width: number;
};

export type CmsData = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  text1: string;
  text2: string;
  text3: string;
  title?: string;
  applicationName?: string;
  subTitle1?: string;
  subTitle2?: string;
  subTitle3?: string;
  lastMessage?: string;
  img1?: Image;
  img2?: Image;
  img3?: Image;
  icon?: Image;
};
