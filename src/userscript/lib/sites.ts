import Container from '@ptpp/utils/class/container';

type supportModuleType = 'schema' | 'public' | 'private'

const context = require.context('@ptpp/sites/src/', true, /\.ts$/);

class Sites extends Container {
    public readonly ctx = context;

    private readonly _supportList: {
        [key in supportModuleType | 'all']: string[]
    } = { private: [], public: [], schema: [], all: [] };

    constructor () {
        super();

        /**
         * 使用 require.context 动态获取所有private, public, schema 方法
         * 注意，设置的mode是weak，意味着我们不能使用 context('moduleA') 的方法获取模块
         * 但这样也方便我们后续使用 Dynamic import 的相关特性来构造 webpackChunkName
         * @refs: https://github.com/webpack/webpack/issues/9184
         *
         */
        context.keys().forEach(value => {
            const moduleName = value.replace(/^\.\//, '').replace(/\.ts$/, '');

            if (!moduleName.startsWith('schema/Abstract')) { // 'schema/Abstract' 不应该被任何形式的导入和引用，也不会被构造
                const [_type, site] = moduleName.split('/');
                this._supportList[_type as supportModuleType].push(site);
                this._supportList.all.push(moduleName);
            }
        });
    }
}

// 单例模式
export default new Sites();
