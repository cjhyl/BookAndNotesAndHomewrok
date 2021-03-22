<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配菜单</span>
      </div>
      <el-tree
        :data="menus"
        :props="defaultProps"
        node-key="id"
        ref="menu-tree"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      >
      </el-tree>
      <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      checkedKeys: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  async created () {
    await this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      // 使用push没有触发组件的更新，使用下面的=才能触发
      // this.checkedKeys.push(391 as never)
      // this.checkedKeys.push(10 as never)
      // this.checkedKeys = [391, 10] as any
      this.getCheckedKeys(data.data)
      console.log('123', this.checkedKeys)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.checkedKeys.push(menu.id as never) // 使用push没有触发组件的更新，使用下面的=才能触发
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      console.log(menuIdList)
      try {
        const { data } = await allocateRoleMenus({
          roleId: this.roleId,
          menuIdList
        })
        console.log(data)
        this.$message.success('操作成功')
        this.$router.back()
      } catch (err) {
        this.$message.error('操作失败')
      }
    },

    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped></style>
