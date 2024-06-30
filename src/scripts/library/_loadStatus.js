/**
 * ロードステータスをクラスに付与する
 * @param {?} targets imgなどelement、またはelementの配列
 */
export default function _loadStatus(targets) {
  if (targets) {
    // imgなどを対象にする場合
    const _targets = [targets].flat();

    _targets.forEach(target => {
      target.addEventListener("load", evt => {
        evt.currentTarget.dataset.loadStatus = "load";
      });
    });

    return targets;
  }

  // bodyを対象にする場合（引数なし）
  const body = document.body;
  window.addEventListener("DOMContentLoaded", evt => {
    document.body.dataset.loadStatus = "dom";
  });

  window.addEventListener("load", evt => {
    document.body.dataset.loadStatus = "load";
  });

  return body;
}
