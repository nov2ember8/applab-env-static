// import { getCookie, setCookie, clearCookie } from "./modules/_cookie";

/**
 * クッキーを取得する
 * @param {String} key 取得対象のクッキーの名前
 */
export function getCookie(key) {
  console.log(`getCookie:${key}`);
  const cookies = document.cookie; //全てのcookieを取り出して
  const cookiesArray = cookies.split(";"); // ;で分割し配列に

  for (let c in cookiesArray) {
    //一つ一つ取り出して
    var cArray = cookiesArray[c].split("="); //さらに=で分割して配列に
    if (cArray[0] === key) {
      // 取り出したいkeyと合致したら
      console.log(cArray[1]);
      return cArray[1]; // [key,value]
    }
  }
  return null;
}

/**
 * クッキーを保存する
 * @param {str} key クッキーの名前
 * @param {str} value クッキーの値
 * @param {int} opt_maxAge クッキーの有効期限 設定しない場合はセッション終了時に削除される
 */
export function setCookie(key, value, opt_maxAge) {
  console.log(`setCookie:${key},${value},${opt_maxAge}`);
  if (opt_maxAge) {
    document.cookie = `${key}=${value};`;
  } else {
    document.cookie = `${key}=${value}; max-age=${opt_maxAge};`;
  }
}

/**
 * クッキーを削除する
 * @param {Stirng}} key 削除対象クッキーの名前
 */
export function clearCookie(key) {
  console.log(`clearCookie:${key}`);
  document.cookie = `${key}=; max-age=0;`;
}
