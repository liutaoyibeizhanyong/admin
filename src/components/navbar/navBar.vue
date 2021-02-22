<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <!-- <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div> -->
        <!-- <div class="logo"><img class="img" src="@/assets/img/dou.png" alt="">{{title}}</div>        -->
        <div class="header-right">
            <div class="header-user-con">
              
    
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
            
                <div class="user-avator">
                    <span style="font-size: 20px;">{{username}}</span>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="loginOut" icon="el-icon-switch-button">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>
<script>
// import bus from '../bus';
export default {
    data() {
        return {
            title:"爱豆语音管理后台",
            fullscreen: false,
            user:'管理员',
        };
    },
    computed: {
        username() {
            let username = this.$store.state.user.user_name;
            return username ? username : this.user;
        }
    },
    methods: {

         /**
         * @全屏事件
         */
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        /**
         * 退出登录
         */
        loginOut(){
          window.sessionStorage.clear();
          this.$router.push({name:"login"})
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/navbar/navBar";
</style>
