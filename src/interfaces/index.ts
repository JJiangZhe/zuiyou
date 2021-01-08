// 根据分类查询文章
interface ArticleByCt {
  id: number;
  page: number;
  pageSize: number;
}

// 登陆
interface Login {
  phone: string;
  password: string;
}

export { ArticleByCt, Login };
