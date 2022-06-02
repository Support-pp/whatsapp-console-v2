export class NotFoundException {
  private message: string;
  private name: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'NotFoundError';
  }
}
