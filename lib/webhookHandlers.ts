export async function handleRazorpayWebhook(payload: any) {
  const { event, payload: eventPayload } = payload;
  
  switch (event) {
    case "payment.captured":
      await handlePaymentCaptured(eventPayload.payment.entity);
      break;
    case "payment.failed":
      await handlePaymentFailed(eventPayload.payment.entity);
      break;
    default:
      console.log(`Unhandled Razorpay event: ${event}`);
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    // Update payment transaction status
    await client
      .patch(payment.receipt) // Assuming receipt contains transaction ID
      .set({
        status: "captured",
        razorpayPaymentId: payment.id,
        updatedAt: new Date().toISOString(),
      })
      .commit();

    // Update enrollment status
    const { course_id, user_id } = payment.notes;
    
    await client
      .patch({ 
        query: `*[_type == "enrollment" && course._ref == $courseId && student.firebaseUid == $userId][0]`,
        params: { courseId: course_id, userId: user_id }
      })
      .set({
        paymentStatus: "completed",
        razorpayPaymentId: payment.id,
      })
      .commit();
      
  } catch (error) {
    console.error("Error handling payment captured:", error);
  }
}
