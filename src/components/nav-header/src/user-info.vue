<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div>
          <el-avatar
            :size="36"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><circle-close /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><User /></el-icon>
            <span>用户信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import LocalCache from '@/utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const handleExitClick = () => {
      LocalCache.deleteCache('token')
      router.push('./login')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;

  .el-avatar {
    margin-right: 8px;
  }
}
</style>
