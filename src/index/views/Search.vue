<template>
  <div class="search-torrent">
    <el-card class="box-card">
      <el-form ref="form" label-width="100px" @submit.native.prevent>
        <el-form-item label="搜索关键词">
          <el-input v-model="search"></el-input>
        </el-form-item>
        <template v-if="extSearch">
          <el-form-item label="启用站点">
            <el-checkbox-group v-model="searchSite">
              <el-checkbox v-for="enabledSite in enabledSites" :key="enabledSite" :label="enabledSite">
                {{ getSiteMetaData(enabledSite).name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="startSearch" :disabled="searchSite.length === 0 || disableSearch">搜索
          </el-button>
          <el-button type="info" @click="extSearch = !extSearch">
            {{ extSearch ? '隐藏' : '显示' }} 更多选项
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-divider></el-divider>
    <el-table :data="searchData" stripe size="small"
              :default-sort = "{prop: 'time', order: 'descending'}"
    >
      <el-table-column label="站点" align="center" width="80px" class="captionText" sortable prop="source.name">
        <template #default="{row}">
          <el-link :href="row.source.url">{{ row.source.name }}</el-link><br>
          <span>{{row.category || 'Other'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template #default="{row}">
          <el-link :href="row.url" target="_blank" style="white-space: nowrap;">{{ row.title }}</el-link>
          <br/>
          <div class="sub-title captionText">
            <span v-if="row.tags.length > 0" class="tags">
              <span v-for="tag in row.tags" :key="tag.name" :style="{'background-color': tag.color}">{{ tag.name }}</span>
            </span>
            <span style="white-space: nowrap;">{{ row.subTitle || '' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="大小" width="100px"  align="center" prop="size" sortable>
        <template #default="{row}">{{ formatSizeString(row.size) }}</template>
      </el-table-column>
      <el-table-column label="上传" prop="seeders" align="center" width="70px" sortable></el-table-column>
      <el-table-column label="下载" prop="leechers" align="center" width="70px" sortable></el-table-column>
      <el-table-column label="完成" prop="completed" align="center" width="70px" sortable></el-table-column>
      <el-table-column label="发布于(≈)" prop="time" align="center" width="150px" sortable>
        <template #default="{row}">{{ formatDatetime(row.time) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="60px">
        <template #default="{row}">
          <a :href="row.link" download>
            <i class="el-icon-download"></i>
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PQueue from 'p-queue/dist';
import {formatSizeString} from "@/shared/filters/size";
import dayjs from '@/shared/dayjs';

const queue = new PQueue({concurrency: 4});

export default {
  name: "Search",
  data() {
    return {
      search: '',
      extSearch: false,
      searchSite: [],
      disableSearch: false,
      enabledSites: __PTM_APP__.sites.enabledSite,
      searchData: [],
      allSite: __PTM_APP__.sites.allSiteMetaData,
    }
  },

  mounted() {
    this.searchSite = Array.from(this.enabledSites);
  },

  methods: {
    async startSearch() {
      this.disableSearch = true;
      this.searchData = [];
      for (const site of this.searchSite) {
        await queue.add(async () => {
          const siteClass = await __PTM_APP__.sites.getSite(site)
          try {
            const torrents = await siteClass.searchTorrents({keywords: this.search})
            this.searchData.push(...torrents);
          } catch (e) {
            console.log(site);
          }
        })
      }

      await queue.onIdle();
      this.disableSearch = false;
    },

    getSiteMetaData(key) {
      return __PTM_APP__.sites.getSiteMetaData(key)
    },
    formatSizeString,
    formatDatetime(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style scoped>
.tags > span {
  font-size: 9px;
  margin: 0 1px;
  color: #fff;
  padding: 1px 3px;
}

.search-torrent .captionText {
  font-size: 12px;
  color: #aaa;
}

.search-torrent .sub-title {
  word-break: break-all;
  white-space: nowrap;
  margin-top: 2px;
  color: #8c8c8c !important;
}
</style>
