export function formatTimeoutTooltip(timeout: number) {
    const totalSecond = timeout / 1000
    const minute = Math.floor(totalSecond / 60)
    const second = minute > 0 ? totalSecond % (60 * minute) : totalSecond

    const convert = []
    if (minute > 0) {
        convert.push(`${minute} 分钟`)
    }

    if (second > 0) {
        convert.push(`${second} 秒`)
    }

    return convert.join(' ')
}