import { Request, Response } from "express";
import { ContentModel } from "../db";


export const PostContent = async (req: Request, res: Response): Promise<void> => {
    console.log('Received content creation request:', {
        userId: req.userId,
        content: req.body.content,
        link: req.body.link,
        type: req.body.type,
        title: req.body.title,
        tags: req.body.tags
    });

    try {
        // Validate required fields
        if (!req.body.title || !req.body.type) {
            console.error('Missing required fields:', { title: req.body.title, type: req.body.type });
            res.status(400).json({
                message: "Title and type are required fields"
            });
            return;
        }

        // Ensure tags is an array of strings
        const tags = Array.isArray(req.body.tags)
            ? req.body.tags.map((tag: unknown) => String(tag).trim()).filter((tag: string) => tag.length > 0)
            : [];

        // Create content with validated tags
        const newContent = await ContentModel.create({
            content: req.body.content,
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            userId: req.userId,
            tags: tags
        });

        console.log('Successfully created content:', {
            contentId: newContent._id,
            title: newContent.title,
            type: newContent.type,
            tags: newContent.tags
        });

        res.status(201).json({
            message: "Content added successfully",
            content: newContent
        });
    } catch (error) {
        console.error('Error creating content:', error);
        res.status(500).json({
            message: "Error creating content",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}

