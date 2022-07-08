// Type definitions for discord-forums v1.0.0
// Project: https://github.com/Abdelrahman-Mohammad/discord-forums
// Definitions by: Abdelrahman Mohammad <https://github.com/Abdelrahman-Mohammad/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { User, Message } from "discord.js";
console.log(User)

declare module "discord-forums" {
    export default class DiscordForums {
        static async connectionURL(dbURL: string): Promise<typeof import("mongoose")>;
    }
}