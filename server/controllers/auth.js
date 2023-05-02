import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "Имя пользователя уже занят.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    await newUser.save();

    res.json({
      newUser,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    res.json({ message: "Ошибка при создание пользователя" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверяем, что переданы корректные данные
    if (!username || !password) {
      return res.status(400).json({
        error: {
          code: "bad_request",
          message: "Неверный запрос. Укажите имя пользователя и пароль.",
        },
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        error: {
          code: "unauthorized",
          message: "Пользователь с таким именем не найден.",
        },
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        error: {
          code: "unauthorized",
          message: "Неверный пароль.",
        },
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Вы успешно авторизовались.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: "internal_server_error",
        message: "Внутренняя ошибка сервера. Попробуйте еще раз позже.",
      },
    });
  }
};

// Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого пользователя не существует",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },

      res.json({
        user,
        token,
      })
    );
  } catch (error) {
    res.json({ message: "Нет доступа." });
  }
};
