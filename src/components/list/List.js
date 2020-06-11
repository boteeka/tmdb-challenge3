import { Lightning } from 'wpe-lightning-sdk';
import Item from '../item';

export default class List extends Lightning.Component {
    static _template() {
        return {
            Items: {
                y: 120,
                forceZIndexContext: true,
                boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' },
                },
            },
            Focus: {
                /**
                 * @ todo: Your goal is to add a focus indicator. Please take a look at the video
                 * and inspect the rectanle frame that's before the focused movie item.
                 * extra: Animate it a bit when the focus changes to the next item
                 */
                rect: true,
                colorLeft: 0xff8ecea2,
                colorRight: 0xff03b3e4,
                h: 6,
                y: 500,
                transitions: {
                    alpha: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' },
                    w: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' },
                    x: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' },
                },
            },
            Metadata: {
                /**
                 * @todo: Your goal is to add a component that have multiple text labels,
                 * 1 for the Title of the selected asset and 1 for the genre.
                 */
                Title: {
                    text: { text: '', fontSize: 50, fontFace: 'SourceSansPro-Bold' },
                    y: (y) => y - 150,
                },
                MetaInfo: {
                    alpha: 0.6,
                    text: { text: '', fontSize: 20, fontFace: 'SourceSansPro-Regular' },
                    y: (y) => y - 90,
                },

                Synopsis: {
                    alpha: 0.8,
                    text: {
                        text: '',
                        fontSize: 22,
                        maxLines: 4,
                        lineHeight: 30,
                        textOverflow: 'ellipsis',
                        maxLinesSuffix: '...',
                        fontFace: 'SourceSansPro-Regular',
                        w: 1920 / 2,
                    },
                    y: (y) => y - 40,
                },
            },
        };
    }

    _init() {
        this._index = 0;
    }

    _handleLeft() {
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight() {
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    $changeMetadata(item) {
        this.tag('Title').text = item.title;
        this.tag('MetaInfo').text = `${item.releaseDate.split('-')[0]} • ${item.genres}`;
        this.tag('Synopsis').text = item.overview;
        this.fireAncestors('$changeBackdrop', item.background);
    }

    /**
     * @todo:
     * Implement working setIndex method
     * that stores index and position movie component to focus
     * on selected item
     */
    setIndex(idx = this._index) {
        // store new index
        this._index = idx;

        // update position
        if (idx < 13) {
            this.tag('Items').setSmooth('x', idx * -220);
            this.tag('Focus').patch({
                smooth: { x: 0, w: this.activeItem.finalW },
            });
        } else {
            this.tag('Focus').patch({
                smooth: { x: (idx - 12) * 220, w: this.activeItem.finalW },
            });
        }
    }

    _focus() {
        this.tag('Focus').w = 0;
        this.tag('Focus').setSmooth('alpha', 1);

        this.setIndex();
    }

    _unfocus() {
        this.tag('Focus').setSmooth('alpha', 0.0001);
    }

    set label(v) {
        // @todo: update list title
    }

    set data(v) {
        // we add an array of object with type: Item
        this.tag('Items').children = v.map((asset, index) => {
            return {
                type: Item,
                item: asset,
                x: index * (Item.width + Item.offset),
            };
        });
    }

    get items() {
        return this.tag('Items').children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }
}
