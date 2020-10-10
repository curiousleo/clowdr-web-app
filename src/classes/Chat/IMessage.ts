import IMember from "./IMember";

export default interface IMessage {
    sid: string;
    author: string;
    body: string;
    dateUpdated: Date;
    index: number;
    lastUpdatedBy: string;
    timestamp: Date;
    attributes: any;
    memberSid: string;
    getMember(): Promise<IMember | "system">;
    remove(): Promise<void>;
    updateBody(body: string): Promise<void>;
    updateAttributes(attributes: any): Promise<this>;
}
