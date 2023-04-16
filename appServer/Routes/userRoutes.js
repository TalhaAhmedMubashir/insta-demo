const routes = require('express').Router();
const {authenticate} = require('../Middleware/user.jwt.controller')
const userController = require('../Controller/user.controller')

routes.post('/signup',userController.signup)
routes.post('/signin',userController.signin)

routes.use('/getfollowers', authenticate);
routes.post('/getfollowers',userController.getFollowers);

routes.use('/getfollowing', authenticate);
routes.post('/getfollowing',userController.getFollowing);

routes.use('/getnotification', authenticate);
routes.post('/getnotification',userController.getNotification);

routes.use('/addfollowing', authenticate);
routes.post('/addfollowing',userController.addFollowing);

routes.use('/unfollow', authenticate);
routes.post('/unfollow',userController.unFollow);

routes.use('/search', authenticate);
routes.post('/search',userController.search);

routes.use('/updateNotificationStatus', authenticate);
routes.post('/updateNotificationStatus',userController.updateNotificationStatus);


module.exports = routes;
