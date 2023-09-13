import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc Auth User
 * @route POST /api/users/login
 * @access	public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password.');
	}
});

/**
 * @desc GET User Profile
 * @route GET /api/users/profile
 * @access	private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc Register New User
 * @route POST /api/users/
 * @access	public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); // Bad Request
		throw new Error('User already exists');
	}

	const user = await User.create({ name, email, password });

	if (user) {
		// Successfully Created
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

/**
 * @desc	Update user profile
 * @route	PUT /api/users/profile
 * @access	private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc get all users
 * @desc get /api/users
 * @access private/admin
 */

const getUsers = asyncHandler(async (req,res)=>{
	const users =await User.find({}).select('-password');
	res.json(users);
});

/**
 * @desc delete user
 * @route delete /api/users/:id
 * @access private /admin
 */
const deleteUser=asyncHandler(async (req,res)=>{
	const user =await User.findById(req.params.id);

	if(user){
		await User.deleteOne(user);
		res.json({message:'User deleted'});
	}else{
		res.status(404);
		throw new Error('user not found');
	}
});

/**
 * @desc Get user by Id
 * @route Get /api/users/:id
 * @access private/admin
 */

const getUserById= asyncHandler(async(req,res)=>{
	const user =await User.findById(req.params.id).select('-password');

	if(user){
		res.json(user);
	}else{
		res.status(user);
		throw new Error('User not found');
	}
});

/**
 * @desc update a user
 * @route put /api/users.:id
 * @access private/admin
 */

const updateUser =asyncHandler(async(req,res)=>{
	const user =await User.findById(req.params.id);

	if(user){
		user.name= req.body.name || user.name;
		user.email= req.body.email || user.email;
		user.isAdmin=req.body.isAdmin;

		const updatedUser =await user.save();

		res.json({
			id: updatedUser._id,
			name:updatedUser.name,
			email:updatedUser.email,
			isAdmin:updatedUser.isAdmin,
		});
	}else{
		res.status(404);
		throw new Error('User not found');
	}
});


export {authUser,
	deleteUser,
	getUserById,
	getUserProfile,
	getUsers,
	registerUser,
	updateUser,
	updateUserProfile,  };
