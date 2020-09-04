<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../assets/avatar.jpg" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          default-active="/users">
          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children"
                          :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容区域-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data(){
      return {
        // 左侧菜单数据
        menulist:[],
        iconsObj:{
          '125':'el-icon-s-custom',
          '103':'el-icon-info',
          '101':'el-icon-s-goods',
          '102':'el-icon-s-order',
          '145':'el-icon-s-data'
        },
        isCollapse:false//是否折叠
      }
    },
    created(){
      this.getMenuList()
    },
    methods:{
      logout(){
        window.sessionStorage.clear();
        this.$router.push("/login");
      },
      async getMenuList(){
        const {data:res}=await this.$http.get('menus');
        if(res.meta.status!==200) return this.$message.error(res.meta.msg);
        this.menulist=res.data;
        console.log(res)
      },
      // 点击按钮进行菜单的折叠和展开
      toggleCollapse(){
        this.isCollapse=!this.isCollapse
      },
      // 保存链接的激活状态
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
      }
    }
  };
</script>

<style lang="less" scoped>
  .home-container{
    height:100%;
  }
  .el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color:#fff;
    font-size:20px;
    >div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
    img{
      width:7%;
      height:7%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-aside{
    background-color: #333744;
    .el-menu{
      border-right:none;
    }
  }
  .el-main{
    background-color: #eaedf1;
  }
  .toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;

  }
</style>
