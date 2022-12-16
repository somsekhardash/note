export const dateFormater = (date) => {
    return new Date(parseInt(date)).toLocaleDateString('en-US')
}

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    )
}

export class CookieMaker {
    expires = ''
    constructor(name, value, days) {
        this.name = name
        this.value = value
        this.days = days
    }
    createCookie() {
        if (this.days) {
            var date = new Date()
            date.setTime(date.getTime() + this.days * 24 * 60 * 60 * 1000)
            this.expires = '; expires=' + date.toGMTString()
        }
        document.cookie =
            this.name + '=' + this.value + this.expires + '; path=/'
    }
    static readCookie(name) {
        var nameEQ = name + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length)
        }
        return null
    }
    
    static deleteCookie(name) {
        this.createCookie(name, '', -1)
    }
}
