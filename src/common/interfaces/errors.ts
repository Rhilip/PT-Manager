
// 错误： 页面未能插入脚本
export class CantInsertScriptError extends Error {

}

// 错误： 未登录站点
export class NotLoggedError extends Error {
}

// 错误： 解析页面错误（可用于种子搜索时、获取用户信息时解析错误）
export class ParsePageError extends Error {
}