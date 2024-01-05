import { MasterData } from "./MasterData";
import { User } from "./User";

export class Risk {
    constructor(
        public id:string,
        public name:string,
        public description:string,
        public image:string,
        public level: MasterData,
        public progress: MasterData,
        public reportedClass: MasterData,
        public riskType: MasterData,
        public device: MasterData,
        public assignee: User,
        public reporter: User,
        public createdDate: Date,
        public completedDate: Date | null,
        public message: string,
        public messages: MasterData[]
    ) {}
}