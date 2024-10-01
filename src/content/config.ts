import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: ({
        image
    }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        // author: z.string(),
        // Relación
        image: image().refine((img) => img.width < 1200, {
            message: 'Image should be lower than 1200px',
        }),
        author: reference('author'),
        // Relación
        tags: z.array(z.string()),
        isDraft: z.boolean().default(false)
    })
})

const authorCollection = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            avatar: image(),
            twitter: z.string(),
            github: z.string(),
            bio: z.string(),
            subtitle: z.string(),
            linkedIn: z.string()
        }),

})

export const collections = {
    blog: blogCollection,
    author: authorCollection
}