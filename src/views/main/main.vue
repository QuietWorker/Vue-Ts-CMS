<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '220px'">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },

  setup() {
    const isCollapse = ref(false)

    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
      console.log(isCollapse.value)
    }
    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.main {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.main-content {
  display: flex;

  .el-aside {
    background: #001529;
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: pointer;
    // line-height: 200px;
    // overflow-x: hidden;
    // overflow-y: auto;
    // text-align: left;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .page-content {
    height: calc(100% - 48px);
    .page-info {
      background-color: #fff;
      border-radius: 5px;
    }
  }
}

.el-header {
  display: flex;
  text-align: center;
  align-items: center;
  color: #333;

  height: 48px !important;
}

.el-main {
  text-align: center;
  color: #333;
  background-color: #f0f2f5;
}
</style>
