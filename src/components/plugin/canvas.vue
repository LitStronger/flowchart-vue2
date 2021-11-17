<template>
  <div class="canvas">
    <div class="node-header">Canvas</div>
    <div class="section-group">
      <!-- <p>
                <input class="magic-checkbox" type="checkbox" @change="changeShadow"  id="shadow" v-model="shadow"  name="checkbox" />
                <label for="shadow">节点阴影</label>
            </p> -->
    </div>
    <div class="cmd-tip">
      <ul>
        <li>ctrl + c/v 复制/粘贴</li>
        <li>ctrl + z/y 撤销/恢复</li>
        <li>ctrl + s 保存</li>
        <li>delete 删除</li>
      </ul>
    </div>
  </div>
</template>
<script>
import eventBus from "../../eventbus";
export default {
  name: "Canvas",
  data() {
    return {
      shadow: false,
    };
  },
  mounted() {},
  methods: {
    changeShadow() {
      this.shadow = !this.shadow;
      eventBus.$emit("shadow", { shadow: this.shadow });
    },
  },
};
</script>
<style scoped>
.node-header {
  height: 40px;
  line-height: 40px;
  text-indent: 6px;
  border-bottom: 1px solid #e6e9ed;
  background: #f5f5f5;
  margin-bottom: 20px;
}
.section-group {
  line-height: initial;
}
.section-group p {
  padding-left: 6px;
}
</style>
