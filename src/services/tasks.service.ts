import Task from '../models/task.model';

export class TasksService {
  private readonly apiPath = 'http://localhost:3000/tasks';

  private readonly contentTypeHeader = { 'Content-Type': 'application/json' };

  private static async handleResponse(resp: Response) {
    // fetch does not automatically throw on error response
    if (!resp.ok) throw new Error(`Fetch Error: \n ${await resp.text()}`);
    return resp.json();
  }

  async getTasks(): Promise<Task[]> {
    const uri = this.apiPath;

    const resp = await fetch(uri);

    return TasksService.handleResponse(resp);
  }

  async createTask(task: Task): Promise<any> {
    const uri = this.apiPath;
    const method = 'POST';
    const body = JSON.stringify(task);
    const headers = { ...this.contentTypeHeader };

    const resp = await fetch(uri, { method, body, headers });

    return TasksService.handleResponse(resp);
  }

  async toggleTask(task: Task): Promise<any> {
    const uri = `${this.apiPath}/${task.id}`;
    const method = 'PATCH';
    const body = JSON.stringify({ complete: !task.complete });
    const headers = { ...this.contentTypeHeader };

    const resp = await fetch(uri, { method, body, headers });

    return TasksService.handleResponse(resp);
  }

  async deleteTask(id: number): Promise<any> {
    const uri = `${this.apiPath}/${id}`;
    const method = 'DELETE';

    const resp = await fetch(uri, { method });

    return TasksService.handleResponse(resp);
  }
}

export default new TasksService();
