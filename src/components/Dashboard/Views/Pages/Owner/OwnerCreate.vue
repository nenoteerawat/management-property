<template>
  <div class="row">
    <div class="col-md-6">
      <card>
        <h4 slot="header" class="card-title">
          Stacked Form
        </h4>

        <fg-input placeholder="Enter email" label="Email address"></fg-input>
        <fg-input placeholder="Password" label="Password" type="password"></fg-input>

        <p-checkbox>Subscribe to newsletter</p-checkbox>

        <p-button type="info" round>Submit</p-button>

      </card> <!-- end card -->
    </div>
  </div>
</template>
<script>
  import { Card } from 'src/components/UIComponents'


  export default {
    components: {
      Card
    }
  }

</script>
<style>

</style>
