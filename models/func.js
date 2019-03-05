
// 获取用户ip
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for')
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',')
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress
    }
    return ipAddress.substring(7)
}


// 获取本地
function getIPAdress() {
    var interfaces = require('os').networkInterfaces()
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

function logs(){
    console.log('logs')
}

module.exports = {
    getClientIp:getClientIp,
    getIPAdress:getIPAdress,
    logs:logs
}