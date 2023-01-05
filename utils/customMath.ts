// 生成数字id
function getId(length: number): number {
  return Number(
    Math.random().toString().substr(3, length) +
      (1 + Math.random()) * new Date().getTime(),
  );
}
/**
 * 生成Guid
 * @return {*}  {string}
 */
function Guid(): string {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1: number, arg2: number): number {
  let r1, r2;
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const c = Math.abs(r1 - r2);
  const m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}
function accAdds(...args: number[]): number {
  return args.reduce((pre, cur) => accAdd(pre, cur), 0);
}
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1减去arg2的精确结果
 **/
function accSub(arg1: number, arg2: number): number {
  let r1, r2;
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  const n = r1 >= r2 ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1: number, arg2: number): number {
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    // console.error(e);
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    // console.error(e);
  }
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
}
function accMuls(...args: number[]): number {
  return args.reduce((pre, cur) => accMul(pre, cur), 1);
}
/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1: number, arg2: number): number {
  let t1 = 0,
    t2 = 0;
  arg1 = arg1 || 0;
  arg2 = arg2 || 1;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    //console.error(e);
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    //console.error(e);
  }
  const r1 = Number(arg1.toString().replace('.', ''));
  const r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

// 保留几位小数
//  0.001 + 12.334 = 12.334999999999999  这个也是不行的
// 改进方法：先加小数部分，然后，加上整数部分
export function toFixed(data: number, deci = 2): number {
  // data 数据， deci 几位
  if (typeof data === 'number') {
    return Math.round(data * Math.pow(10, deci)) / Math.pow(10, deci);
    const splitArr = String(data).split('.'); // 字符串截取
    const integerPart = splitArr[0]; // 整数部分
    const deciPart = splitArr[1]; // 小数部分
    // 小数位数小于要保留的位数时，直接返回
    if (!deciPart || (deciPart && deciPart.length < deci + 1)) return data;
    const frontDec = deciPart.substr(0, deci); // 保留几位
    const isAdd = +deciPart.substr(deci, 1) >= 5 ? 1 / Math.pow(10, deci) : 0;
    return (
      parseFloat(frontDec) / Math.pow(10, deci) +
      isAdd +
      parseFloat(integerPart)
    );
  }
  return data;
}
export default {
  accAdd,
  accSub,
  accMul,
  accDiv,
  getId,
  toFixed,
  accMuls,
  accAdds,
  Guid,
};
