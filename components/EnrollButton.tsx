"use client";


import { createRazorpayOrder } from "@/app/actions/createRazorpayOrder"; // Adjust the import path as necessary
// If you have a different path, update accordingly.

import { useAuth } from "@/app/contexts/AuthContext";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function EnrollButton({
  courseId,
  isEnrolled,
  coursePrice,
  courseTitle,
}: {
  courseId: string;
  isEnrolled: boolean;
  coursePrice: number;
  courseTitle: string;
}) {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleEnroll = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    if (coursePrice === 0) {
      // Handle free course enrollment
      try {
        await enrollInFreeCourse(courseId, user.uid);
        toast({
          title: "Enrolled successfully!",
          description: "You can now access the course.",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "Enrollment failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
      return;
    }

    startTransition(async () => {
      try {
        const order = await createRazorpayOrder(courseId, user.uid);
        
        const options = {
          key: order.key,
          amount: order.amount,
          currency: order.currency,
          name: 'EduHansa',
          description: `Enrollment for ${courseTitle}`,
          order_id: order.orderId,
          prefill: {
            name: userProfile?.displayName || user.displayName || 'Student',
            email: user.email || '',
            contact: userProfile?.phoneNumber || '',
          },
          theme: {
            color: '#6366f1',
          },
          handler: async function (response: any) {
            try {
              await verifyPayment({
                orderId: order.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                courseId,
                userId: user.uid,
              });
              
              toast({
                title: "Payment successful!",
                description: "You are now enrolled in the course.",
              });
              
              router.push(`/dashboard/courses/${courseId}`);
            } catch (error) {
              console.error("Payment verification error:", error);
              toast({
                title: "Payment verification failed",
                description: "Please contact support if amount was deducted.",
                variant: "destructive",
              });
            }
          },
          modal: {
            ondismiss: function () {
              toast({
                title: "Payment cancelled",
                description: "You can try again anytime.",
              });
            },
            onhidden: function () {
              console.log("Payment modal closed");
            },
          },
          notes: {
            course_id: courseId,
            student_name: userProfile?.displayName || user.displayName,
          },
          retry: {
            enabled: true,
            max_count: 3,
          },
        };

        // Check if Razorpay is loaded
        if (typeof window !== 'undefined' && window.Razorpay) {
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          toast({
            title: "Payment system not loaded",
            description: "Please refresh the page and try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Payment initialization error:", error);
        toast({
          title: "Payment initialization failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  // Loading state
  if (isPending) {
    return (
      <div className="w-full h-12 rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Enrolled state
  if (isEnrolled) {
    return (
      <Link
        href={`/dashboard/courses/${courseId}`}
        className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 h-12 flex items-center justify-center gap-2 group"
      >
        <span>Access Course</span>
        <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Link>
    );
  }

  // Enroll button
  return (
    <button
      className="w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12 bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      onClick={handleEnroll}
      disabled={!user || isPending}
    >
      {!user ? (
        "Sign in to Enroll"
      ) : coursePrice === 0 ? (
        "Enroll for Free"
      ) : (
        `Enroll Now - ₹${coursePrice.toLocaleString('en-IN')}`
      )}
    </button>
  );
}

// Helper function for free course enrollment
async function enrollInFreeCourse(courseId: string, firebaseUid: string) {
  const response = await fetch('/api/enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      courseId, 
      firebaseUid, 
      paymentId: 'free_enrollment',
      amount: 0,
      paymentProvider: 'free',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to enroll in free course');
  }

  return response.json();
}

// Helper function for payment verification
async function verifyPayment(data: {
  orderId: string;
  paymentId: string;
  signature: string;
  courseId: string;
  userId: string;
}) {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Payment verification failed');
  }

  return response.json();
}

export default EnrollButton;