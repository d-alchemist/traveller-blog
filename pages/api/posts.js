import axios from 'axios';

export default async(req, res) => {
    const response = await axios.get('https://kh-blog-app.herokuapp.com/api/v1/articles');
    res.send(response.data);
}