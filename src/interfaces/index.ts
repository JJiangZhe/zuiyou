// 根据分类查询文章
interface ArticleByType {
  type: number;
  page: number;
  limit: number;
}

// 发布文章
interface publish {}

// 登陆
interface Login {
  phone: string;
  password: string;
}

export { ArticleByType, Login };
