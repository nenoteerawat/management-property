<template>
  <tr>
    <!-- <td>
      <p-checkbox v-model="task.done">
      </p-checkbox>
    </td>
    <td class="img-row">
      <div class="img-wrapper">
        <img :src="task.img" class="img-raised" :alt="task.title">
      </div>
    </td> -->
    <td class="text-left">{{task.title}}</td>
  </tr>
</template>
<script>

  export default {
   
    props: {
      task: {
        type: Object,
        default: () => {
          return {
            title: ''
          }
        }
      },
      index: Number
    },
    methods: {
    }
  }
</script>
<style>
</style>
