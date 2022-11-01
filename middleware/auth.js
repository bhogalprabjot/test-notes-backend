import jwt from "jsonwebtoken";

// do something and move to next
const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        let decodedData = jwt.verify(token, 'test');

        req.userId = decodedData?.id;


        next();

    }catch(error){
        // console.log(error);
        return res.status(403).json({message: error.message});
    }
}

export default auth;

