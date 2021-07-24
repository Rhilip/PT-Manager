export * from './filters/size';
export * from './filters/number';
export * from './filters/html';
export * from './filters/date';

export function getFixedRatio(uploaded = 0, downloaded = 0): string | '∞' {
    const ratio = uploaded / downloaded;
    if (ratio === Infinity || ratio > 10000) {
        return '∞'; // Ratio过大时，将分享率设置为无限
    } else {
        return ratio.toFixed(2);
    }
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 生成随机字符串
 * @param length
 * @param noSimilar 是否包含容易混淆的字符[oO,Ll,9gq,Vv,Uu,I1]，默认为包含
 */
export function getRandomString(length = 32, noSimilar = false): string {
    const chars = noSimilar
        ? 'abcdefhijkmnprstwxyz2345678ABCDEFGHJKMNPQRSTWXYZ'
        : 'abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHIJKMNOPQRSTUVWXYZ';
    const maxLength = chars.length;
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(chars.charAt(Math.floor(Math.random() * maxLength)));
    }

    return result.join('');
}
