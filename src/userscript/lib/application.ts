import GMStorage from 'gm-storage';

export default class Application {
    // 脚本应用中外抛的对象
    public readonly store = new GMStorage();

    private isInit = false;

    async init() {
        // 首先 判断是不是在install页面，如果是的话，重定向到安装后的首页，即 '#/'
        if (location.hash.search('#/install') >= 0) {
            location.hash = '#/'
        }

        this.isInit = true;
        console.log('Insert PTM on Manager Page')
    }
}
