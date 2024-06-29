

export const durationToTime = (duration: number) : string => {
    if(!duration) return ''
    const minute = Math.floor(duration / 60)
    const second = Math.floor(duration % 60)
    return `${minute}:${second <10 ? '0': ''}${second}`
}