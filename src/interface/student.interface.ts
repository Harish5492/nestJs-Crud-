import { Document } from 'mongoose';
console.log("inside student inteface before")
export interface IStudent extends Document{
    readonly name: string;
    readonly roleNumber: number;
    readonly class: number;
    readonly gender: string;
    readonly marks: number;
}
console.log("inside student inteface after")