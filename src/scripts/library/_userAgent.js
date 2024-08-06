import UAParser from "ua-parser-js";

export default function _userAgent() {
  const list = [browserName, deviceType, deviceModel, fullosVersion, osName];
  list.forEach(x => addBody(x));
}

/**
 * https://github.com/faisalman/ua-parser-js#methods
 */
const parser = new UAParser().getResult();
const browser = parser.browser;
const browserName = browser.name;
// const browserVersion = browser.version;
// const browserMajor = browser.major;
const device = parser.device;
const deviceModel = device.model;
const deviceType = device.type || "pc";
// const deviceVendor = device.vendor;
const os = parser.os;
const osName = os.name;
const osVersion = os.version.replace(/\..*/, "");
const fullosVersion = `${osName}${osVersion}`;
// const engine = parser.engine;
// const engineName = engine.name;

function lower(target) {
  if (target) return target.toLowerCase();
}

function kebab(target) {
  if (target) return target.replace(/\s/g, "-");
}

function addBody(target) {
  target = lower(target);
  target = kebab(target);
  if (target) document.body.classList.add(target);
}
