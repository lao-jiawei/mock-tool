/**
 * @func 判断字符串是否是正则表达式
 * @desc jvtool-1.0.6可使用
 * @param {}  
 * @return {} 
 */
function strIsReg(str) {
  let isReg = false;
  try {
    isReg = eval(str) instanceof RegExp
  } catch (e) {
    isReg = false
  }
  return isReg
}
export {
  strIsReg
};
