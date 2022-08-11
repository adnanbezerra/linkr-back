import { hashTagsRepository } from "../repository/hashTagsRepository.js";
import urlMetadata from 'url-metadata';


export async function getTagsByPostId(req, res) {
    const { id } = req.params;
    try {
        const { rows: hashtags } = await hashTagsRepository.getTagsByPostId(id);
        res.send(hashtags);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getTrends(req,res){
    try{
        const {rows: trends} = await hashTagsRepository.getTrends();
        res.send(trends);
    }catch(error){
        return res.sendStatus(500);
    }
}
export async function getPostsByTag(req, res) {
    const { tagName } = req.params;
    try {
        const { rows: posts } = await hashTagsRepository.getPostsByTag(tagName);
        res.send(posts);
    } catch (error) {
        return res.sendStatus(500);
    }
}

