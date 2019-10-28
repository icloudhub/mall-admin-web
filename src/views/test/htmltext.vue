<template>
    <div>

      <attributedText  v-model="content"></attributedText>
    </div>
</template>

<script>
import attributedText  from "@/components/attributedText";
import  mytext  from "./components/mytext";

export default {
  components: {
    attributedText,
    mytext
  },
  data() {
    return {
      content: "this.value",
    }
  }
}
</script> 

<style>

</style>