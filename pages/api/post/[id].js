import axios from 'axios';

export default async (req, res) => {
    const {
        query: { id },
    } = req;
    if (req.method === 'GET') {
        const result = await axios(`https://kh-blog-app.herokuapp.com/api/v1/articles/${id}`)
        res.send(result.data);
    }
    if (req.method === 'PUT') {
        const result = await axios.put(`https://kh-blog-app.herokuapp.com/api/v1/articles/${id}`, req.body, {
            headers: {
                authorization: req.headers.authorization
            }
        })
        res.send(result.data);
    }
    if (req.method === 'DELETE') {
        await axios.delete(`https://kh-blog-app.herokuapp.com/api/v1/articles/${id}`, {
            headers: {
                authorization: req.headers.authorization
            }
        })
    }
};
