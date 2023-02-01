<template>
  <div id="writing-introduction">
    <div class="header">
      <n-h1 prefix="bar"> Hi </n-h1>
    </div>
    <n-divider />
    <div class="about-me">
      <div class="title">
        <n-h2> 关于我 </n-h2>
      </div>
      <div class="content">
        <n-p>
          ISTP，是个赌狗，喜欢投机，贪财好色
          <br />
          每天在贪婪和恐惧之间徘徊，曾经拥有很多，但都得而复失
        </n-p>
      </div>
    </div>
    <n-divider />
    <div class="about-web">
      <n-h2> 关于本站 </n-h2>
      <div class="content">
        <n-p>
          这里存放一些乱七八糟的东西，大概是一些笔记和日常记录
          <br />
          原本这些内容是我在 Obsidian 上进行编辑和管理的，偶然间接触到了 Arweave
          这个去中心化存储 ，于是通过 Bundlr Network 上传到 Arweave
          网络当中，来尝试实现数据的永久存储。
        </n-p>
      </div>
    </div>
    <n-divider />
    <div class="link">
      <n-h2> Link </n-h2>
      <div class="content">
        <div class="link-item">
          <n-button
            text
            tag="a"
            href="https://github.com/ChanIok/"
            target="_blank"
          >
            <template #icon>
              <n-icon>
                <LogoGithub />
              </n-icon>
            </template>
            Github
          </n-button>
        </div>
        <div class="link-item">
          <n-button
            text
            tag="a"
            href="mailto:chaniok@qq.com"
            target="_blank"
          >
            <template #icon>
              <n-icon>
                <Mail />
              </n-icon>
            </template>
            Mail
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { NDivider, NH1, NH2, NP, NIcon, NButton } from 'naive-ui';
  import { LogoGithub, Mail } from '@vicons/ionicons5';
  onMounted(() => {});
</script>

<style lang="less" scoped>
  #writing-introduction {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px;
    .link {
      .content {
        display: flex;
        .link-item {
          margin-right: 20px;
        }
      }
    }
  }
</style>
