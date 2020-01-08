import CryptoJS from 'crypto-js'
import JsEncrypt from 'jsencrypt'

const encrypt = {}

// randomKey 产生任意长度随机字母数字组合
// randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
encrypt.randomKey = (randomFlag, min, max) => {
    let str = ''
    let range = min
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
    }
    return str
}

/**
* 定义加密函数
* @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data)
* @param {string} key - 加密使用的 key
*/

encrypt.aesEncrypt = (data, key) => {
    // 字符串类型的key用之前需要用uft8先parse一下才能用
    // 向量iv，可增加加密算法的强度
    const G_IV = CryptoJS.enc.Utf8.parse('0102030405060708')
    const MD5Key = CryptoJS.MD5(key)
    // 根据字节数组生成AES密钥
    const encryptedData = CryptoJS.AES.encrypt(data, MD5Key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: G_IV
    })

    // 在encryptedData.ciphertext上的属性转为字符串才是后端需要的格式。
    // 需要读取encryptedData上的ciphertext.toString()才能拿到跟Java一样的密文
    const encryptedStr = encryptedData.ciphertext.toString()
    return encryptedStr
}

/**
* 定义解密函数
* @param {string} encrypted - 加密的数据
* @param {string} key - 加密使用的 key
*/

encrypt.aesDecrypt = (encrypted, key) => {
    // 这里 mode, padding, iv 一定要跟加密的时候完全一样
    const G_IV = CryptoJS.enc.Utf8.parse('0102030405060708')
    const MD5Key = CryptoJS.MD5(key)

    // 由于加密后的密文为128位的字符串，那么解密时，需要将其转为Base64编码的格式。
    // 那么就需要先使用方法CryptoJS.enc.Hex.parse转为十六进制，
    // 再使用CryptoJS.enc.Base64.stringify将其变为Base64编码的字符串，
    // 此时才可以传入CryptoJS.AES.decrypt方法中对其进行解密。
    // 128位字符串>16进制
    const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted)
    // 16进制>base64
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)

    // 返回的是一个解密后的对象
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, MD5Key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: G_IV
    })

    // 经过CryptoJS解密后，依然是一个对象，将其变成明文就需要按照Utf8格式转为字符串。
    // 解密后，需要按照Utf8的方式将明文转位字符串
    const resultDecipher = decryptedData.toString(CryptoJS.enc.Utf8)
    return resultDecipher
}

// -----------------------------------------------------------------------

/**
* 定义返回数据可用格式转换函数
* @param {string} strKey - 后台返回的特定格式数据
*/

encrypt.styleEncrypt = (strReturn) => {
    strReturn = strReturn.replace(/[\r\n]/g, '')
    return strReturn
}

/**
* 定义获取rsa加密公钥函数
* @param {string} strKey - 后台加密后的字符串
*/

encrypt.getRsaKey = (strKey) => {
    let tempKey = strKey
    // 判断strkey中有'--'字符串
    if (tempKey.indexOf('--') >= 0) {
        // 获取第一个'\n'的下标
        let pos = tempKey.indexOf('\n')
        // 如果存在'\n'
        if (pos > 0) {
            // 则取第一个'\n',到字符串结束的子串
            tempKey = tempKey.substring(pos + 1)
            // 获取最后一个'\n'的下标
            pos = tempKey.lastIndexOf('\n', tempKey.lastIndexOf('\n') - 1)
            // 如果存在
            if (pos > 0) {
                // 得到子串
                tempKey = tempKey.substring(0, pos + 1)
                // 最终返回第一个'\n'和最后一个'\n'之间的子串
                return tempKey
            }
        }
    }
    return strKey
}

/**
* 定义加密函数
* @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data)
* @param {string} key - 加密使用的 key
*/

encrypt.rsaEncrypt = (data, key) => {
    // 实例化一个JSEncrypt对象
    const jse = new JsEncrypt()
    jse.setPublicKey('-----BEGIN PUBLIC KEY-----' + '\n' + key + '-----END PUBLIC KEY-----' + '\n')
    // 将数据经过rsa加密，默认返回的是base64加密的格式
    const rsaKeyBase64 = jse.encrypt(data)
    // 解密base64
    const rsaKeyDBase64 = CryptoJS.enc.Base64.parse(rsaKeyBase64)
    // 将解密的base64转为16进制字符串
    const rsaKey16byte = CryptoJS.enc.Hex.stringify(rsaKeyDBase64)
    return rsaKey16byte
}

export default encrypt
