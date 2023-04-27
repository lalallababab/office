<template>
  <div>
    <div class="positionManaTool">
      <el-input v-model="role.name" placeholder="请输入角色英文名" size="small">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input v-model="role.nameZh" placeholder="请输入角色中文名" size="small" @keydown.enter.native="doAddRole"></el-input>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="doAddRole">添加角色</el-button>
    </div>
    <!-- 手风琴 -->
    <div class="positionManaMain">
      <el-collapse v-model="activeName" accordion @change="change">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button type="text" icon="el-icon-delete" style="float: right;padding: 3px 0;color: #f41f0a" @click="doDeleteRole(r)">
              </el-button>
            </div>
            <div>
              <el-tree ref="treeRef" show-checkbox :data="allMenus" :props="defaultProps"
                       :default-checked-keys="selectedMenus"
                       node-key="id" :key="index"></el-tree>
              <div style="display: flex;justify-content: flex-end">
                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: "PositionMana",
  data() {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedMenus: [],
      activeName: -1
    }
  },
  mounted() {
    this.initRoles()
    this.initAllMenus()
  },
  methods: {
    // 删除角色
    doDeleteRole(role){
      this.$confirm('此操作将永久删除[' + role.nameZh + ']角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/permission/role/' + role.id).then(resp => {
          if (resp) {
            this.initRoles()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 添加角色
    doAddRole(){
      if (this.role.name && this.role.nameZh) {
        this.postRequest('/system/basic/permission/role',this.role).then(resp=>{
          if (resp) {
            this.initRoles()
            this.role.name = ''
            this.role.nameZh = ''
          }
        })

      }else {
        this.$message.error('所有字段不能为空！')
      }
    },
    // 取消修改
    cancelUpdate() {
      this.activeName = -1
    },
    // 确认修改
    doUpdate(rid, index) {
      let tree = this.$refs.treeRef[index]
      let selectedKeys = tree.getCheckedKeys(true)
      let url = '/system/basic/permission/?rid=' + rid
      selectedKeys.forEach(key => {
        url += '&mids=' + key
      })
      this.putRequest(url).then(resp => {
        if (resp) {
          this.activeName = -1
        }
      })
    },
    change(rid) {
      if (rid) {
        this.initAllMenus()
        this.initSelectedMenus(rid)
      }
    },
    initSelectedMenus(rid) { // :name="r.id"  change(rid)
      this.getRequest('/system/basic/permission/mid/' + rid).then(resp => {
        if (resp) {
          this.selectedMenus = resp
        }
      })
    },
    // 获取所有菜单
    initAllMenus() {
      this.getRequest('/system/basic/permission/menus').then(resp => {
        if (resp) {
          this.allMenus = resp
        }
      })
    },
    // 获取所有角色
    initRoles() {
      this.getRequest('/system/basic/permission/').then(resp => {
        if (resp) {
          this.roles = resp
        }
      })
    }
  }
}
</script>

<style scoped>
.positionManaTool {
  display: flex;
  justify-content: flex-start;
}

.positionManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}

.positionManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>
