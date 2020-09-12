import axios from 'axios';

export default async(req, res) => {
    const result = await axios.post(`https://kh-blog-app.herokuapp.com/login`, req.body);
    res.send(result.data);
}