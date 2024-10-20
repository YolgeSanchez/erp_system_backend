import UserServices from './users.services'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../types/errors'
import { Request, Response } from 'express'
import { RequestExt } from '../../types/express'

class UserController {
  // get all users
  getUsers = async (_: Request, res: Response) => {
    try {
      const users = await UserServices.getUsers()
      res.status(200).send(users)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // get a user
  getUser = async (req: Request, res: Response) => {
    try {
      const user = await UserServices.getUser(req.params.id)
      res.status(200).send(user)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // update a user
  updateUser = async (req: RequestExt, res: Response) => {
    try {
      const updatedUser = req.body
      const user = await UserServices.updateUser(req.params.id, updatedUser, req.user)
      res.status(200).send(user)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // delete a user
  deleteUser = async (req: RequestExt, res: Response) => {
    try {
      await UserServices.deleteUser(req.params.id, req.user)
      res.sendStatus(200)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // register user
  createUser = async (req: RequestExt, res: Response) => {
    try {
      const registeredUser = await UserServices.createUser(req.body, req.user)
      res.status(201).send(registeredUser)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }
}

export default new UserController()
