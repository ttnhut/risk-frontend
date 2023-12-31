import { Role } from "./Role";

export class User {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public type: string,
        public role: Role | null,
        public image: string
    ) {}
}