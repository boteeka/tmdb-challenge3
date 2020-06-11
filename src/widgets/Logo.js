import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class Logo extends Lightning.Component {
    static _template() {
        return {
            Logo: {
                src: Utils.asset('images/logo.png'),
            },
        };
    }
}
