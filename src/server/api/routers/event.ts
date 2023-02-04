import { z } from "zod";
import { createEventInputSchema } from "../../../utils/schemas";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const eventRouter = createTRPCRouter({
    create: publicProcedure
        .input(createEventInputSchema)
        .mutation(({ input }) => { 
            throw Error('whoo')
         })
})
