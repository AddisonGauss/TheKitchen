import asyncHandler from "express-async-handler"
import Recipe from "../models/recipeModel.js"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

// @desc    Auth user & get token
// @route   POST /api/users/login/
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid login credentials")
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (password.length < 4) {
    throw new Error("Password must be atleast 4 characters long")
  }
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User with that email already exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Add recipe to user favorites
// @route   POST /api/users/myfavorites
// @access  Private
const addRecipeToFavorites = asyncHandler(async (req, res) => {
  const { recipeId } = req.body

  const recipe = await Recipe.findById(recipeId)

  if (req.user.favorites.includes(recipe._id)) {
    throw new Error("Recipe already in favorites")
  }
  if (recipe && req.user) {
    await req.user.favorites.push(recipe)
    await req.user.save()
    res.json({ message: "Recipe added to favorites" })
  } else {
    res.status(404)
    throw new Error("Recipe/user not found")
  }
})

// @desc    Fetch user's favorite recipes
// @route   GET /api/users/myfavorites
// @access  Private
const getFavoriteRecipes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites")

  if (user) {
    res.json(user.favorites)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Generate reset password token and save to user/email link for user
// @route   POST /api/users/forgot
// @access  Public
const forgotPasswordReset = asyncHandler(async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(400)
      throw new Error("Email not found")
    }
    let reset_token = await generateResetToken()
    user.resetPasswordToken = await reset_token
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hour in ms
    // passport local mongoose allows for promises inherently.
    await user.save()

    await sendForgotPasswordEmail(req, user, reset_token)
    return res.json({ msg: "Mail sent successfully" })
  } catch (err) {
    return res.status(400).json(err)
  }
})

// @desc    Get user's token/ if user's token is valid to reset password
// @route   GET /api/users/reset/:token
// @access  Private
const checkUserTokenResetPassword = asyncHandler(async (req, res) => {
  try {
    let user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    })
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Reset password token not found or has expired" })
    }
    res.json({ token: req.params.token })
  } catch (err) {
    return res.status(400).json({ msg: err })
  }
})

// @desc    Reset password with user token
// @route   POST /api/users/reset/:token
// @access  Private
const resetUserPassword = asyncHandler(async (req, res) => {
  try {
    if (!req.body.password || !req.body.confirmPassword) {
      return res.status(400).json({ msg: "Not all fields have been entered" })
    }
    if (req.body.password.length < 4) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 4 characters long" })
    }
    let user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Password token not found or has expired" })
    }

    if (req.body.password === req.body.confirmPassword) {
      user.password = req.body.password
      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined

      const savedUser = await user.save()

      var smtpTransport = nodemailer.createTransport({
        pool: true,
        service: "Gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          refreshToken: process.env.EMAIL_REFRESH_TOKEN,
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_CLIENT_SECRET,
        },
      })

      var mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: "Your password has been changed",
        text:
          "Hello,\n\n" +
          "This is a confirmation that the password for your account " +
          user.email +
          " has just been changed.\n",
      }

      await smtpTransport.sendMail(mailOptions)
      res.json(savedUser)
    } else {
      return res.status(400).json({ msg: "Passwords do not match" })
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message })
  }
})

const sendForgotPasswordEmail = async (req, user, reset_token) => {
  try {
    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
      },
    })
    // set options
    var mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "TheKitchen password reset",
      text:
        "Hello " +
        user.email +
        "You are receiving this because you (or someone else) have requested the reset of the password linked to your Recipe account." +
        "Please click on the following link, or paste this into your browser to complete the process." +
        "\n\n" +
        "http://" +
        req.headers.host +
        "/reset/" +
        reset_token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.",
    }

    await smtpTransport.sendMail(mailOptions)
  } catch (err) {
    res.json(err)
  }
}

var generateResetToken = () => {
  return new Promise((resolve, reject) => {
    // crypto random bytes has a callback.
    // randombytes(size[, callback])
    crypto.randomBytes(20, (err, buf) => {
      if (err) reject(err)
      else {
        let reset_token = buf.toString("hex")
        resolve(reset_token)
      }
    })
  })
}

export {
  authUser,
  addRecipeToFavorites,
  getFavoriteRecipes,
  forgotPasswordReset,
  checkUserTokenResetPassword,
  resetUserPassword,
  registerUser,
}
