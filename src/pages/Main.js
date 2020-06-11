import { Lightning, Router, Img } from 'wpe-lightning-sdk';
import { List } from '../components';
import { getImgUrl } from '../lib/tools';

export default class Main extends Lightning.Component {
    static _template() {
        return {
            Backdrop: {
                w: 1920,
                h: 1080,
                alpha: 0.4,
                colorBottom: 0xff000000,
                transitions: {
                    alpha: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' },
                },
            },
            List: {
                x: 100,
                y: 560,
                zIndex: 3,
                type: List,
            },
        };
    }

    _init() {
        this._index = 0;
    }

    set data(v) {
        this.tag('List').data = v;
    }

    $changeBackdrop(bg) {
        clearTimeout(this._bgTimeout);

        const tag = this.tag('Backdrop');

        this._bgTimeout = setTimeout(() => {
            tag.patch({
                texture: Img(getImgUrl(bg, 1280)).cover(1920, 1080),
            });
        }, 10);
    }

    _focus() {
        this.patch({
            Lists: {
                smooth: { y: [560, { duration: 0.2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }] },
            },
        });
    }

    _unfocus() {
        this.patch({
            Lists: {
                smooth: { y: [600, { duration: 0.4 }] },
            },
        });
    }

    _getFocused() {
        return this.tag('List');
    }

    _handleUp() {
        Router.focusWidget('menu');
    }
}
