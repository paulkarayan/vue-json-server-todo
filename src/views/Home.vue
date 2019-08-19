<template>
  <div class="home">

    <div class="row">
      <input type="text"
        class="form-field"
        v-model="newTask.name"
        placeholder="Add New Task">
      <button class="create"
        :disabled="!newTask.name"
        @click="createTask()">ADD TASK</button>
    </div>

    <div class="header">To-Dos: Demonstrating Maximum Test Power Since 2019</div>

    <div class="row"
      v-for="task of allTasks"
      :key="task.id">
      <div class="form-field">
        <input type="checkbox"
          :id="task.id"
          :checked="task.complete"
          v-on:change="toggleTask(task)">
        <label :for="task.id">{{task.name}}</label>
      </div>
      <button class="delete"
        @click="deleteTask(task.id)">DELETE</button>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Task from '../models/task.model';
import TasksServiceInstance from '../services/tasks.service';

@Component
export default class Home extends Vue {
  private readonly tasksService = TasksServiceInstance;

  private readonly newTask: Task = { name: null, complete: false };

  private allTasks: Task[] | null = null;

  created(): void {
    this.getTasks();
  }

  async getTasks(): Promise<void> {
    this.allTasks = await this.tasksService.getTasks();
  }

  async createTask(): Promise<void> {
    await this.tasksService.createTask(this.newTask);
    this.newTask.name = null;
    await this.getTasks();
  }

  async toggleTask(task: Task): Promise<void> {
    await this.tasksService.toggleTask(task);
    await this.getTasks();
  }

  async deleteTask(id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
    await this.getTasks();
  }
}
</script>

<style lang="scss" scoped>
  button {
    height: 30px;
    width: 100px;
    margin: 2px;
    border-radius: 5px;
    font-weight: 600;
    font-size: .8em;
    &.delete {
      color: red;
    }
    &.create {
      color: black;
      &:disabled {
        color: lightgrey;
      }
    }
  }
  input {
    border: 1px lightgrey solid;
    font-size: 1.1em;
    &[type=checkbox] {
      transform: scale(1);
    }
  }
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    > .header {
      font-weight: 600;
      width: 650px;
      margin-top: 30px;
      border-bottom: solid 1px black;
    }
    > .row {
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      align-items: left;
      > .form-field {
        display: flex;
        align-items: left;
        width: 500px;
      }
    }
  }
</style>
