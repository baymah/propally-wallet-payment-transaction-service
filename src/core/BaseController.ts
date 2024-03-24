import * as express from "express"
import { GenericAppError } from "./logic/AppError"

export abstract class BaseController {
  protected req: express.Request
  protected res: express.Response

  public execute = async (req: express.Request, res: express.Response, controllerFunction: () => Promise<void | any>): Promise<void> => {
    this.req = req
    this.res = res

    controllerFunction()
  }

  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ status: false, message, data: null })
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (dto) {
      return res.status(200).json(dto)
    } else {
      return res.sendStatus(200)
    }
  }

  public created<T>(res: express.Response, dto?: T) {
    if (dto) {
      return res.status(201).json(dto)
    }
    return res.sendStatus(201)
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(this.res, 400, message ? message : "Invalid Request")
  }

  public unauthorized(message?: string) {
    return BaseController.jsonResponse(this.res, 401, message ? message : "Unauthorized")
  }

  public paymentRequired(message?: string) {
    return BaseController.jsonResponse(this.res, 402, message ? message : "Payment required")
  }

  public forbidden(message?: string) {
    return BaseController.jsonResponse(this.res, 403, message ? message : "Forbidden")
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(this.res, 404, message ? message : "Not found")
  }

  public conflict(message?: string) {
    return BaseController.jsonResponse(this.res, 409, message ? message : "Conflict")
  }

  public tooMany(message?: string) {
    return BaseController.jsonResponse(this.res, 429, message ? message : "Too many requests")
  }

  public todo() {
    return BaseController.jsonResponse(this.res, 400, "TODO")
  }

  public fail(error: Error | string | GenericAppError.UnexpectedError) {
    return this.res.status(500).json({
      message: error.toString(),
    })
  }
}
