import Parse from "parse";
import { ProgramTrack as Schema } from "../DBSchema/ProgramTrack";
import { Conference } from "./Conference";

export class ProgramTrack
    extends Parse.Object
    implements Schema {

    constructor() {
        super("ProgramTrack");
    }

    get badgeText(): string {
        return this.get("badgeText");
    }

    get badgeColor(): string {
        return this.get("badgeColor");
    }

    get displayName(): string {
        return this.get("displayName");
    }

    get exhibit(): "None" | "Grid" | "List" {
        return this.get("exhibit");
    }

    get name(): string {
        return this.get("name");
    }

    get perProgramItemChat(): boolean {
        return this.get("perProgramItemChat");
    }

    get perProgramItemVideo(): boolean {
        return this.get("perProgramItemVideo");
    }

    get showAsEvents(): boolean {
        return this.get("showAsEvents");
    }

    get conference(): Conference {
        return this.get("conference");
    }

}
Parse.Object.registerSubclass('ProgramTrack', ProgramTrack);