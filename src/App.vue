<template>
  <div id="app">
    <router-view/>
    <!-- 插件 用来动态的修改 meta title -->
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
body,html{-webkit-text-size-adjust: none;width: 100%;height: 100%;}
body{ margin: 0;padding: 0; overflow: hidden;}
*{text-decoration: none;list-style: none;}
img{border: 0px;}
input{outline: none;}
ul,li,dl,dd,dt,p,ol,h1,h2,h3,h4,h5{font-size: 12px;font-weight: 100;padding: 0;margin: 0;}
p{font-size: 14px;}
a:active {color: #fff}
.font10{transform: scale(0.6);}
.font12{font-size: 12px;}
.font14{font-size: 14px;}
.font16{font-size: 16px;}
.font18{font-size: 18px;}
.font20{font-size: 20px;}
.font22{font-size: 22px;}
.font24{font-size: 24px;}
.font28{font-size: 28px;}
.font30{font-size: 30px;}
.font32{font-size: 32px;}
.font36{font-size: 36px;}
.font44{font-size: 44px;}
.fontBold{font-weight: bold;}
.flex{display: flex; box-sizing: border-box;}
.flex1{flex: 1}
.textRight{text-align: right;}
.textCenter{text-align: center;}
.textLeft{text-align: left;}
.inlineBlock{display: inline-block;}
.alignCenter{align-items: center;}
.justifyCenter{justify-content: center;}
.justifyAround{justify-content: space-around;}
.justifyBetween{justify-content: space-between;}
.paddingL10{padding-left: 10px;}
.mint-header{background: #2E2C2F !important}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #ccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color: #ccc;
   opacity:1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color: #ccc;
   opacity:1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color: #ccc;
}
::-ms-input-placeholder { /* Microsoft Edge */
   color: #ccc;
}

</style>
