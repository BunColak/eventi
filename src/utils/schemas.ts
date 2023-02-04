import { z } from "zod";

export const numberInString = z.string().transform((val, ctx) => {
    const parsed = parseInt(val);
    if (isNaN(parsed)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Not a number",
        });
        return z.NEVER;
    }
    console.log(parsed % 15, parsed)
    if (parsed % 15 !== 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.not_multiple_of,
            multipleOf: 15
        });
        return z.NEVER;
    }
    return parsed;
});


export const createEventInputSchema = z.object({
    title: z.string().trim(),
    description: z.string().optional(),
    durationMinutes: numberInString,
    proposedDates: z.array(z.object({ date: z.date(), time: z.date() })),
    email: z.string().email(),
    allowNewDates: z.boolean().default(false)
})