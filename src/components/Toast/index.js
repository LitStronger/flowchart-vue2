import vue from "vue";

import Toast from "./index.vue";
const ToastConstructor = vue.extend(Toast);

function showToast(type) {
  return function(msg) {
    //duration
    const dom = new ToastConstructor({
      el: document.createElement("div"),
      data() {
        return {
          type,
          msg,
        };
      },
    });
    document.body.appendChild(dom.$el);
  };
}

export default {
  info: showToast("info"),
  success: showToast("success"),
};
