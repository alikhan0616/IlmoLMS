import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel, { IOrder } from "../models/order-model";
import userModel from "../models/user-model";
import courseModel from "../models/course-model";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification-model";
import { newOrder } from "../services/order-service";

// Create Order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler(`You cannot purchase a course twice!`, 400)
        );
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(`Invalid course Id`, 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData: any = {
        order: {
          _id: String(course._id).slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(`Error sending mail`, 400));
      }

      user?.courses.push(course?.id);

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You got a new order of ${course?.name}`,
      });
      course.purchased = (course.purchased || 0) + 1;

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
