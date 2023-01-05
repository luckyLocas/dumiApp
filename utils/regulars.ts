const Regulars = {
  NoSpace: /^[^ ]+$/, //不含空格
  ContactNumber: /^[0-9]*$/, //联系方式
  PassWord: /^[0-9A-Za-z]{6,16}$/, //验证密码
  Title: /^[A-Za-z0-9\-.]+$/, //字母 数字 横线 点
};

export default Regulars;
