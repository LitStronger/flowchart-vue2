<template>
  <div ref="toast" class="toast-wrap toast-move-in">
    <div class="notice-wrap">
      <div class="notice">
        <div class="toast-icon" :class="prefixCls + '-' + type + '-icon'">
          <i :class="type + '-icon-rect-l'"></i>
          <i :class="type + '-icon-rect-s'"></i>
        </div>
        <div :class="prefixCls + '-' + type">{{ msg }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      type: "default",
      msg: "",
      prefixCls: "toast",
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.toast.classList.remove("toast-move-in");
      this.$refs.toast.classList.add("toast-move-out");
      console.log(this.$refs.toast);
    }, 5000);
  },
};
</script>
<style scoped>
.toast-wrap {
  position: fixed;
  top: 16px;
  left: 0;
  z-index: 100;
  width: 100%;
  pointer-events: none;
}

.toast-wrap .notice-wrap {
  padding: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.notice {
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 8px 8px;
  display: flex;
  align-items: center;
}

.toast-icon {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin-right: 4px;
  position: relative;
  overflow: hidden;
}

.toast-info-icon {
  background: blue;
}

.toast-success-icon {
  background: #52c41a;
}

.success-icon-rect-l {
  background: white;
  height: 5px;
  width: 8px;
  position: absolute;
  left: 8px;
  top: 8px;
  transform: translate(-4px, -4px) rotateZ(-50deg);
}

.success-icon-rect-s {
  background: #52c41a;
  height: 5px;
  width: 8px;
  position: absolute;
  left: 8px;
  top: 6px;
  transform: translate(-4px, -4px) rotateZ(-50deg);
}

.toast-error {
}
.toast-warning {
}

.toast-move-in {
  animation: MessageMoveIn 0.3s ease-in 1;
}

.toast-move-out {
  /* animation: MessageMoveOut 0.3s ease-out 1; */
  display: none;
}

@keyframes MessageMoveIn {
  0% {
    max-height: 0;
    opacity: 0;
  }
  100% {
    max-height: 150px;
    opacity: 1;
  }
}
@keyframes MessageMoveOut {
  0% {
    max-height: 150px;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
    display: none;
  }
}
</style>
