const express = require('express');
const router = express.Router();
require('../db/connection')
const login = require('../controllers/login')
const verifyToken = require('../middleware/jwtVerify')
const getVerifyToken = require('../controllers/verifyToken')
const resSaveMongooDB = require('../controllers/responseSaveMongooDb')
const getAllPosts = require('../controllers/getAllPosts')
const getSingleCard = require('../controllers/getSingleCard')
const customPostsByLoginUser = require('../controllers/customPostsByLoginUser')
const getCustomPostsByLoginUser = require('../controllers/getCustomPostsBtLoginUser')
const register = require('../controllers/register')
const deletePost = require('../controllers/deletePost')
const updatePost = require('../controllers/updatePost');
const postLike = require('../controllers/postLike');
const unLikePost = require('../controllers/unLikePost');
const getLikeCount = require('../controllers/getLikeCount');


router.post('/api/signin', login)
router.get('/api/protected', verifyToken, getVerifyToken)
router.post('/api/post',resSaveMongooDB)
router.get('/api/posts', getAllPosts)
router.get('/api/post/:id', getSingleCard)
router.post('/api/customPost', verifyToken, customPostsByLoginUser)
router.get('/api/custom-posts', verifyToken, getCustomPostsByLoginUser)
router.post('/api/register', register),
router.delete('/deletePost/:id', verifyToken, deletePost);
router.put('/updatePost/:id', verifyToken, updatePost)
router.post('/like', postLike)
router.delete('/like/:postId/:userId', unLikePost)
router.get('/getLikeCount/:postId', getLikeCount)

module.exports = router