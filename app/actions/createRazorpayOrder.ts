"use server";

import razorpay from '@/lib/razorpay';
import getCourseById from '@/sanity/lib/courses/getCourseById';

export async function createRazorpayOrder(courseId: string, userId: string) {
  try {
    const course = await getCourseById(courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }

    const order = await razorpay.orders.create({
      amount: course.price * 100, // Convert to paise (smallest currency unit)
      currency: 'INR',
      receipt: `course_${courseId}_${userId}_${Date.now()}`,
      notes: {
        courseId,
        userId,
        courseName: course.title,
      },
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
}