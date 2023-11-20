<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!isCollapse">Vue3 + TS</span>
    </div>
    <!-- menu list -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical-demo"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :collapse="isCollapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的item -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 使用动态组件加载icon -->
              <el-icon v-if="item.icon">
                <component :is="item.icon.substring(8)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <template #title>
                  <el-icon v-if="subitem.icon">
                    <component :is="subitem.icon.substring(8)"></component>
                  </el-icon>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一季菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { pathMapToMenu } from '@/utils/map-menus'
import { computed, defineComponent, ref } from 'vue'
import { routerKey, useRoute, useRouter } from 'vue-router'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    //store
    const store = useStore()
    // 使用自己封装的 useStore() 函数后，store.state 的类型就是我们自己定义的 IStoreType 类型了，而不是默认的 any 类型。这样就不会出现从 store.state 中取错属性的问题了。ss
    const userMenus = computed(() => store.state.login.userMenu)

    //router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    //data
    //computed计算属性返回的是ref对象 所以userMenus需要用.value来获取具体值
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')

    //event handle
    const handleMenuItemClick = (menuItem: any) => {
      router.push(menuItem.url)
    }

    return {
      userMenus,
      handleMenuItemClick,
      defaultValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background: #001529;

  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px;

    .img {
      height: 100%;
      margin: 0 10px 0 8px;
    }

    .title {
      color: white;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      // text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .el-menu {
    // 去除右边框（调试技巧：将 el-aside 的 width 固定宽度后再折叠菜单，方便看到右边框）
    border-right: none;
  }

  .el-sub-menu {
    // background-color: #001529;
    // 二级菜单（默认背景）
    .el-menu-item {
      background-color: #0c2135;
      padding-left: 50px !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
    // 这里设置 color 会覆盖掉 el-menu 上 active-text-color 属性设置的值
    color: #fff;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  // 包含块的高度减去 logo 区域的高度
  height: calc(100% - 48px);
  width: 100%;
}

.el-menu--collapse .el-sub-menu.is-active i {
  color: #409eff;
}
</style>
