export class EmailRepository {
    constructor() {
        if (this.constructor === EmailRepository) {
            throw new Error('EmailRepository is an abstract class and cannot be instantiated directly.');
        }
    }

    save({ recipient, subject, content }) {
        throw new Error('save method must be implemented by subclasses.');
    }
}