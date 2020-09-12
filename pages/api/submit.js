import axios from 'axios';

export default async (req,  res) => {
    const result = await axios.post('https://kh-blog-app.herokuapp.com/api/v1/articles', req.body, {
        headers: {
            authorization: req.headers.authorization
        }
    });
    res.send(result.data);
}