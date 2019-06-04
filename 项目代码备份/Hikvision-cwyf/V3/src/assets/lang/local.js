import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';

export function Locals(lang) {
    if (lang == 'en') {
        Locale.use('en', enUS);
    } else if (lang == 'zhCHS') {
        Locale.use('zhCHS', zhCN);
    }
}
