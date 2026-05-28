<template>
  <!-- 基本信息 -->
  <div class="message">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img class="logo-img" src="/images/logo-transparent.png" alt="ChenChuLin" />
      </div>
      <div class="banner-wrapper">
        <img class="domain-banner" src="/images/domain-banner-transparent.png" alt="chulinchen.top" />
      </div>
    </div>
    <!-- 简介 -->
    <div class="description cards" @click="changeBox">
      <div class="content">
        <Icon size="16">
          <QuoteLeft />
        </Icon>
        <Transition name="fade" mode="out-in">
          <div :key="descriptionText.hello + descriptionText.text" class="text">
            <p>{{ descriptionText.hello }}</p>
            <p>{{ descriptionText.text }}</p>
          </div>
        </Transition>
        <Icon size="16">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
import { QuoteLeft, QuoteRight } from "@vicons/fa";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

// 简介区域文字
const descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if (store.getInnerWidth >= 721) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前页面宽度不足以开启盒子",
      grouping: true,
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  }
};

// 监听状态变化
watch(
  () => store.boxOpenState,
  (value) => {
    if (value) {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO_OTHER;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT_OTHER;
    } else {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT;
    }
  },
);
</script>

<style lang="scss" scoped>
.message {
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: fade 0.5s;
    max-width: 460px;
    gap: 20px;
    
    .logo-wrapper {
      position: relative;
      width: 250px;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      // 发光背景效果
      &::before {
        content: '';
        position: absolute;
        width: 220px;
        height: 180px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        z-index: 0;
      }
      
      .logo-img {
        width: 250px;
        height: 250px;
        object-fit: contain;
        position: relative;
        z-index: 1;
        filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))
                drop-shadow(0 0 40px rgba(99, 102, 241, 0.2));
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.5))
                  drop-shadow(0 0 50px rgba(99, 102, 241, 0.3));
        }
      }
    }
    
    .banner-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      
      // 横幅发光效果
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 80%;
        background: radial-gradient(ellipse, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        z-index: 0;
      }
      
      .domain-banner {
        height: 180px;
        object-fit: contain;
        position: relative;
        z-index: 1;
        filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.35))
                drop-shadow(0 0 30px rgba(99, 102, 241, 0.15));
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.02);
          filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.45))
                  drop-shadow(0 0 40px rgba(99, 102, 241, 0.25));
        }
      }
    }
    
    @media (max-width: 768px) {
      .logo-wrapper {
        width: 200px;
        height: 180px;
        
        &::before {
          width: 180px;
          height: 180px;
        }
        
        .logo-img {
          width: 200px;
          height: 180px;
        }
      }
      
      .banner-wrapper .domain-banner {
        height: 180px;
      }
    }

    @media (max-width: 720px) {
      max-width: 100%;
      flex-direction: column;
      gap: 16px;
    }
  }

  .description {
    padding: 1rem;
    margin-top: 3.5rem;
    max-width: 460px;
    animation: fade 0.5s;

    .content {
      display: flex;
      justify-content: space-between;

      .text {
        margin: 0.75rem 1rem;
        line-height: 2rem;
        margin-right: auto;
        transition: opacity 0.2s;

        p {
          &:nth-of-type(1) {
            font-family: "Pacifico-Regular";
          }
        }
      }

      .xicon:nth-of-type(2) {
        align-self: flex-end;
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      pointer-events: none;
    }
  }
}
</style>
