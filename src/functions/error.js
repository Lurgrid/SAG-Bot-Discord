export class error extends Error {
    constructor(message, file, name, err) {
      super(message);
      this.name = name
      this.file = file
      this.err = err
    }
  }