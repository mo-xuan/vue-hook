export interface DownloadApp {
    handleJoin: () => void
}

export default function useDownloadApp(): DownloadApp {

    const handleJoin = ({url = 'https://www.westmoney.com/explore/topic'} = {}) => {
        const baseAppPath = `saxo://westmoney.com/m_web?url=${url}`
        //判断浏览器
        var u = navigator.userAgent
        var d = new Date()
        var t0 = d.getTime()
        const lang = sessionStorage.getItem('lang')
        let delay = null
        if (/MicroMessenger/gi.test(u)) {
            // @ts-ignore
            if (openApp(baseAppPath)) {
                openApp(baseAppPath)
            } else {
                //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
                // @ts-ignore
                delay = setInterval(function () {
                    var d = new Date()
                    var t1 = d.getTime()
                    if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                        window.location.href = 'https://www.westmoney10.com/' + lang + '/appmarket'
                    }
                    if (t1 - t0 >= 3000) {
                        // @ts-ignore
                        clearInterval(delay)
                    }
                }, 1000)
            }
        } else {
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                //Android
                // @ts-ignore
                if (openApp(baseAppPath)) {
                    openApp(baseAppPath)
                } else {
                    //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
                    // @ts-ignore
                    delay = setInterval(function () {
                        var d = new Date()
                        var t1 = d.getTime()
                        if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                            if (lang === 'zh') {
                                window.location.href = `https://www.westmoney10.com/api/cos/apk/west_lts.apk?r=` + Math.random()
                            } else {
                                window.location.href = 'https://play.google.com/store/apps/details?id=com.saxo.westmoney'
                            }
                        }
                        if (t1 - t0 >= 3000) {
                            // @ts-ignore
                            clearInterval(delay)
                        }
                    }, 1000)
                }
            } else if (u.indexOf('iPhone') > -1 || u.indexOf('Safari') > -1) {
                //IOS
                window.location.href = baseAppPath
                setTimeout(() => {
                    window.location.href = 'https://itunes.apple.com/cn/app/id1547938365?mt=8'
                }, 2000)
            }
        }
    }

    const openApp = (src) => {
        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
        // 否则打开a标签的href链接
        const ifr = document.createElement('iframe')
        ifr.src = src
        ifr.style.display = 'none'
        document.body.appendChild(ifr)
        window.setTimeout(function () {
            document.body.removeChild(ifr)
        }, 2000)
    }

    return {
        handleJoin
    }
}
