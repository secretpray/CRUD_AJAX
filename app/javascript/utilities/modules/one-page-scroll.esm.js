/*!
* one-page-scroll 0.2.5
* https://github.com/huihuimoe/one-page-scroll
* Released under the MIT license
*/
const simpleThrottling = (callback, time) => {
    let calledTime = 0;
    return n => {
        const now = Date.now();
        if (calledTime + time < now) {
            calledTime = now;
            callback(n);
        }
    };
};
let init = () => {
    const style = `body{overflow: hidden}.one-page-scroll--page{width: 100%;height: 100%;overflow: hidden;touch-action: none;position: absolute}`;
    const css = new Blob([style], { type: 'text/css' });
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', URL.createObjectURL(css));
    document.head.appendChild(link);
    init = () => {
    };
};
class onePageScroll {
    constructor({el, time = 600, easing = 'ease-out', loop = false, throttling} = {}) {
        init();
        if (!el || !el.length) {
            throw new Error('el is undefined');
        }
        this.time = time;
        this.easing = easing;
        this.loop = loop;
        this.pageTotal = el.length;
        this.active = 1;
        throttling = throttling || time;
        this._el = [].slice.call(el);
        this._el.forEach((el, index) => {
            el.classList.add('one-page-scroll--page');
            el.style.transform = `translateY(${ index * 100 }%)`;
        });
        this._hash = this._el.map((el, i) => el.getAttribute('name') || i + 1);
        const findHash = () => location.hash === '' ? 1 : this._hash.findIndex((hash, i) => {
            if ([
                    '#' + hash,
                    '#' + (i + 1)
                ].includes(location.hash)) {
                return true;
            }
        }) + 1;
        this.goto(findHash());
        const wrapGoto = n => this.goto(n);
        this._goto = throttling ? simpleThrottling(wrapGoto, throttling) : wrapGoto;
        window.addEventListener('popstate', e => {
            const hashIndex = findHash();
            if (hashIndex) {
                this.goto(hashIndex, true);
            }
        });
        [
            'keydown',
            'mousewheel',
            'DOMMouseScroll',
            'touchstart'
        ].map(e => document.addEventListener(e, this));
    }
    goto(n) {
        if (n > this.pageTotal || n < 1) {
            this.loop ? n = 1 : n = this.active;
        }
        if (n !== this.active) {
            this._el.forEach((el, index) => {
                const style = el.style;
                style.transition = `transform ${ this.time }ms ${ this.easing }`;
                style.transform = `translateY(${ (index - n + 1) * 100 }%)`;
            });
            this._el[this.active - 1].dispatchEvent(new CustomEvent('outview'));
            this._el[n - 1].dispatchEvent(new CustomEvent('inview'));
            this.active = n;
            !arguments[1] && history.replaceState({}, '', '#' + this._hash[n - 1]);
        }
        return this;
    }
    next() {
        return this.goto(this.active + 1);
    }
    prev() {
        return this.goto(this.active - 1);
    }
    handleEvent(e) {
        const handleKeyDown = e => {
            switch (e.keyCode) {
            case 33:
            case 38:
                this._goto(this.active - 1);
                break;
            case 32:
            case 34:
            case 40:
                this._goto(this.active + 1);
                break;
            case 36:
                this._goto(1);
                break;
            case 35:
                this._goto(this.pageTotal);
                break;
            }
        };
        const handleMouseWheel = e => {
            const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            if (delta < 0) {
                this._goto(this.active + 1);
            } else {
                this._goto(this.active - 1);
            }
        };
        const handleTouchStart = e => {
            const touches = e.touches;
            if (touches && touches.length) {
                this._touchStartY = touches[0].pageY;
                document.addEventListener('touchmove', this);
            }
        };
        const handleTouchMove = e => {
            const touches = e.touches;
            if (touches && touches.length) {
                e.preventDefault();
                const deltaY = this._touchStartY - touches[0].pageY;
                if (deltaY >= 50) {
                    this._goto(this.active + 1);
                }
                if (deltaY <= -50) {
                    this._goto(this.active - 1);
                }
                if (Math.abs(deltaY) >= 50) {
                    document.removeEventListener('touchmove', this);
                }
            }
        };
        switch (e.type) {
        case 'keydown':
            handleKeyDown(e);
            break;
        case 'mousewheel':
        case 'DOMMouseScroll':
            handleMouseWheel(e);
            break;
        case 'touchstart':
            handleTouchStart(e);
            break;
        case 'touchmove':
            handleTouchMove(e);
        }
    }
}

export default onePageScroll;
