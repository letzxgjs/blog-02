<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <Sign :popSwitch="popNum" @closeDialog="closeDialog"></Sign>
    </el-dialog>
  </div>
</template>

<script>
import Sign from '@/components/sign.vue'
export default {
  data() {
      return {
        dialogVisible: false, 
      };
  },
  props: ['popNum'],
  methods: {
    init(){
      this.dialogVisible = true
    }, 
    closeDialog(){
      this.dialogVisible = false
    }
  }, 
  components: {
    Sign
  }
}
</script>

<style lang="sass" scoped>

</style>
