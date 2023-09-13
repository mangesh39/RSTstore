import express from 'express';
import { authUser, getUserProfile , getUserById,
		registerUser,updateUserProfile,updateUser,
		deleteUser,getUsers,
} from '../controllers/userController.js';
import { protect ,admin} from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/login').post(authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
	router
	.route('/:id')
	.delete(protect, admin,deleteUser)
	.get(protect,admin,getUserById)
	.put(protect,admin,updateUser)
	
export default router;
