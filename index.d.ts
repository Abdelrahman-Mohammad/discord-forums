// Type definitions for discord-forums v1.3.0
// Project: https://github.com/Abdelrahman-Mohammad/discord-forums
// Definitions by: Abdelrahman Mohammad <https://github.com/Abdelrahman-Mohammad/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { Client, Interaction } from "discord.js"

declare module "discord-forums" {
    export default class DiscordForums {
        static async connectionURL(dbURL: string): Promise<typeof import("mongoose")>;
        static async createForum(client: Client, interaction: Interaction, modalHeader: string, modalTitleLabel: string, modalDescriptionLabel: string): Promise<Object>;
        static async deleteForum(client: Client, userId: string, threadId: string): Promise<Object>;
        static async getForum(userId: string, threadId: string): Promise<Object>;
    }
}