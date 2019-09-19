<template>
  <div class="home">


    <div class="header">WILD BILL HICCUPS -  A CASE STUDY</div>

    <div class="row">
        This is Wild Bill Hiccups Discount Iphone Cases online store. Wild Bill is very proud of it.<br>
        It's a dropshipping ecommerce business that's simple and effective. <br> Behind the scenes, a customer service agent is going to search for the iphone case on other<br> 
         bigger webpages and purchase the product - to be delivered to your address. 
        <br><br>
        let's pick out an iphone case to show you how it works:
    </div>

    <div class="row">
    <video width="960" height="540" controls>
        <source src="../assets/ecommerce.mp4" type="video/mp4">
        Your browser does not support the video tag.
        </video>
    </div>
    
    <div class="row">
       
        Here are some other considerations that Wild Bill has:
    </div>
    
    <div class="row">
        <ul>
            <li> It's hard to train people remotely to do this - prefer automation </li>
            <li> If the Big Ecommerce Supplies site is been down, they'll drop those sales on the ground </li>
            <li> Contractors do shoddy work resulting in regressions that clients (or founders) find </li>
            <li> Business is very seasonal, so the team has to onboard/offboard people constantly </li>
            <li> Permissions and Compliance are important; must control how credit card data is used </li>
            <li> Has started taking bitcoin, so worried about getting hacked </li>

        </ul>
    </div>
   
    <div class="row">
        Here are Bill's two other systems of note - a user data compendium with authentication controls, and a knowledge base 
    </div>

    <div class="row">
      <video width="960" height="540" controls>
        <source src="../assets/user info.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    
    </div>
    
    <div class="row">
    <video width="960" height="540" controls>
        <source src="../assets/knowledge base.mp4" type="video/mp4">
        Your browser does not support the video tag.
        </video>
    
    </div>
   
    <div class="header">AUTOMATING THE PAIN AWAY</div>

    <div class="row">
        Now that you understand what's going on, we're going to help Bill with his problems <br>
        The answer is both "more cowbell" and "moar automation"
    </div>

    <div class="row">
        For our first example, let's look at some basic QA Automation flows. This will deal with the contractors and their regressions.<br>
        We can write automation in any way we'd like, but we're going to get the best results using <br>
        one of the many different human readable syntaxes, such as Gauge, Cucumber/Gherkin, Robot Framework,
        and Mocha/Chai. <br>
        The automation can use APIs and other clients, leverage event-driven platforms like StackStorm, or use
        UI-based methods like Selenium, Taiko, PuppeteerJS, or Cypress. <br>
    </div>

    <div class="row">
       We'll write this one as as a Gauge test, using Taiko.<br>
       You write a human readable description, and then map it to the automation functions.<br>
       Then, it'll show up as part of the documentation that's available to the whole team! Magic!<br>
       This is valuable since you can get feedback, communicate the state of the world, and deal with compliance very easily<br>
    </div>

    <div class="row">
            
    <img source src="../assets/gauge.png">
        </img>

    </div>
    <div class="row">
    <video width="960" height="540" controls>
        <source src="../assets/qaflow.mp4" type="video/mp4">
        Your browser does not support the video tag.
        </video>
    
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
    align-content: center;
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
