import qs from "qs";
const AUTH_URL = "https://open.weixin.qq.com/connect/oauth2/authorize";
const SCOPE = "snsapi_base";
const RESPONSE_TYPE = "code";
const APPID = "ww6384f2fac9054721";

/**
 * 生成认证链接
 * @param params
 */
function generateAuthRedirect(params) {
  // 生成跳转链接
  const query = qs.stringify({
    appid: APPID,
    redirect_uri: `http://${params.app}.dev.xbt-dev.top`,
    response_type: RESPONSE_TYPE,
    scope: SCOPE,
    state: "auth",
  });

  return `${AUTH_URL}?${query}#wechat_redirect`;
}

function bootstrap(query) {
  const params = qs.parse(query, {
    ignoreQueryPrefix: true,
  });

  const redircet = generateAuthRedirect(params);
  // redirct地址
  console.info(redircet);
  if (redircet) window.location.href = redircet;
}

bootstrap(window.location.search);
