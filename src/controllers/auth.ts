//ts types
import { Request, Response } from 'express';

//Daos
import { registerValidation, loginValidation } from '../databaseStorage/models/Validation';
import { UserDao } from '../databaseStorage/UserDao';
import { encryptPassword, comparePassword } from '../encoder/bcryptjs';
import { createToken } from '../token/jwt';

export class AuthController {
  private userDao: UserDao;
  constructor(userDao: UserDao) {
    this.userDao = userDao;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { error } = registerValidation(req.body);

      if (error) {
        const errorMessage: string = error.details.pop().message;
        const pureErrorMessage: string = errorMessage.replace(/\"/g, '');
        return res.status(400).json({ error: pureErrorMessage });
      }

      //Check if user exist
      const emailExists = await this.userDao.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' })
      }

      const { hashedPassword, hashedConfirmPassword } = await encryptPassword(req.body.password, req.body.confirmPassword);

      //register user
      const newUser = {
        ...req.body,
        location: '',
        website: '',
        bio: '',
        profileImg: '',
        social: {
          following: [],
          followingCount: 0,
          followers: [],
          followersCount: 0,
        },
        age: {
          day: 'Select day',
          month: 'Select month',
          year: 'Select year',
          privacy: {
            monthAndDay: 'You follow each other',
            year: 'Only you'
          },
        },
        confirmPassword: hashedConfirmPassword,
        password: hashedPassword,
      }

      const user = await this.userDao.add(newUser);
      //Create and assign a token
      const tokenParams = { id: user._id };
      const token: string = await createToken({ params: tokenParams });
      res.header('authToken', token);

      return res.status(200).json({ token, profileImg: user.profileImg });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  //LOGIN USER
  public loginUser = async (req: Request, res: Response) => {
    const { error } = loginValidation(req.body);
    if (error) {
      const errorMessage: string = error.details.pop().message;
      const pureErrorMessage: string = errorMessage.replace(/\"/g, '');
      return res.status(400).json({ error: pureErrorMessage });
    }
    try {
      //Check if same users exists
      const user = await this.userDao.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).json({ error: 'Email or password is wrong' });
      }

      //Check if password is correct
      const validPassword: string = await comparePassword(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: 'Email or password is wrong' });
      }

      const tokenParams = { id: user._id };

      //Create and assign a token
      const token: string = await createToken({ params: tokenParams });
      await res.header('authToken', token);
      return res.status(200).json({ token, profileImg: user.profileImg });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
