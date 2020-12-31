// 距离当前时间多久前 treturn 刚刚-5分钟前-1小时前
export const getDateDiff = (timestamp: string) => {
  let time = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) time *= 1000;
  let timer: number = new Date().getTime() - time;
  timer = timer / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = "";
  switch (true) {
    case timer < 300:
      tips = "刚刚";
      break;
    case timer >= 300 && timer < 3600:
      tips = (timer / 60).toFixed(0) + "分钟前";
      break;
    case timer >= 3600 && timer < 86400:
      tips = (timer / 3600).toFixed(0) + "小时前";
      break;
    case timer >= 86400 && timer < 2592000:
      tips = (timer / 86400).toFixed(0) + "天前";
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (timer >= 2592000 && timer < 365 * 86400) {
        tips = timer / (86400 * 30) + "个月前";
      } else {
        tips = timer / (86400 * 365) + "年前";
      }
  }
  return tips;
};
