<template>
  <div class="home">
    <button @click="getData()">Get Data!</button>
    <div>{{values}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  values = null;
  
  getData() {
    fetch('http://localhost:3000/values')
      .then(values => values.json())
      .then((values) => { this.values = values; });
  }
}
</script>
