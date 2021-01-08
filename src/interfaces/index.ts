// 根据分类查询文章
interface ArticleByCt {
  id: number;
  page: number;
  pageSize: number;
}

// 发布文章
interface publish {}

// 登陆
interface Login {
  phone: string;
  password: string;
}

export { ArticleByCt, Login };
