import { Router } from 'wpe-lightning-sdk';

export default () => {
    Router.widget('splash');
    Router.widget('home/movies', ['Menu', 'Logo']);
    Router.widget('home/series', ['Menu', 'Logo']);
};
