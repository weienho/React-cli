import {getInitConfig} from '../api/sys/configApi'

/**
 * 通过单例模式读取config.json文件
 */
export const initConfig=(async function() {
    var instance;

    if(!instance) {
        instance=getInitConfig();
    }
    return instance;
})();