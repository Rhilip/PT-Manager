<template>
  <div>

    <el-alert title="站点设置说明" type="info" show-icon>
      <template #default>
        1. 请在启用搜索功能前，预先在本页面开启对应站点。<br>
        2. 请保证当前登录站点域名与本工具定义域名一致。
      </template>
    </el-alert>

    <el-table :data="filteredSite" stripe>
      <el-table-column width="60" label="类别" align="center"
                       :filters="[{text: 'PT', value: 'private'}, {text: 'BT', value: 'public'}]"
                       :filter-method="filterTypeHandler"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.type === 'private'" type="success">PT</el-tag>
          <el-tag v-else type="warning">BT</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="站点名称" width="180" align="center">
        <template #default="scope">
          <el-tooltip v-if="scope.row.description" :content="scope.row.description" placement="bottom">
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
          <span v-else>{{ scope.row.name }}</span>

        </template>
      </el-table-column>
      <el-table-column label="站点链接">
        <template #default="scope">
          <el-link :href="scope.row.url" :disabled="!scope.row.url.startsWith('http')" target="_blank">
            {{ scope.row.url }}
          </el-link>
        </template>
      </el-table-column>

      <el-table-column label="配置基类" prop="schema" width="180" align="center">
        <template #default="scope">
          {{ scope.row.schema || (scope.row.type === 'private' ? 'AbstractPrivateSite' : 'AbstractBittorrentSite') }}
        </template>
      </el-table-column>

      <el-table-column align="center" width="200">
        <template #header>
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template #default="scope">
          <el-switch :value="isSiteEnabled(scope.row.key)" @change="changeSiteEnableStatus(scope.row.key)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Sites",
  data() {
    return {
      search: '',
      allSite: __PTM_APP__.sites.allSiteMetaData,
      enabledSite: __PTM_APP__.sites.enabledSite
    }
  },
  computed: {
    filteredSite: function () {
      return this.allSite
          .filter(data => !this.search
              || [data.name, data.url, data.description].join('|').toLowerCase().includes(this.search.toLowerCase()
              ))  // 启用筛选功能
          .sort((a, b) => {  // 保证已启用站点排在最前
            const v_a = this.isSiteEnabled(a.key) ? 1 : 0;
            const v_b = this.isSiteEnabled(b.key) ? 1 : 0;
            return v_b - v_a;
          })
    }
  },
  methods: {
    isSiteEnabled(siteName) {
      return this.enabledSite.has(siteName)
    },

    changeSiteEnableStatus(siteName) {
      if (this.isSiteEnabled(siteName)) {
        __PTM_APP__.sites.disableSite(siteName)
      } else {
        __PTM_APP__.sites.enableSite(siteName)
      }
      this.enabledSite = __PTM_APP__.sites.enabledSite
    },

    filterTypeHandler(value, row) {
      return row.type === value;
    }
  }
}
</script>

<style scoped>

</style>
