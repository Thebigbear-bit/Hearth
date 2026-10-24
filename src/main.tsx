import {render} from 'preact';
import {App} from './app';
import {loadConfig} from './lib/storage';
import {applyTokens} from './theme/tokens';
import './theme/global.css';

const initial = loadConfig();
applyTokens(initial.theme, document.documentElement, initial.glassTint, initial.reduceEffects);       // theme first, so there is no flash of the wrong colours
render(<App />, document.getElementById('root')!);
