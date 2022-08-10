import { hashTagsRepository } from "../repository/hashTagsRepository.js";


export async function getTagsByPostId(req,res){
    const {id} = req.params;
    try{
        const {rows: hashtags} = await hashTagsRepository.getTagsByPostId(id);
        res.send(hashtags);
    }catch(error){
        return res.sendStatus(500);
    }
}