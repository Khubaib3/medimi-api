import expressJwt from 'express-jwt'
import config from '../configs/config'


function jwt() {
    const { SECRET } = config
    const secret = SECRET
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/v1/user/register',
            '/v1/user/login'
        ]
    })
}

export default jwt

