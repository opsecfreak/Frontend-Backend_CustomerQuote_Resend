"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const formSchema = z.object({
  fromemail: z.string().email({ message: "Invalid email address" }),
  brandName: z.string().optional(),
  companyName: z.string().optional(),
  companyWebsite: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  contactPerson: z.string().optional(),
  phoneNumber: z.string().optional(),
  budget: z.string().optional(),
  urgency: z.string().optional(),
  questions: z.string().optional(),
  requirements: z.string().min(1, { message: "Requirements are required" }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    try {
      const response = await axios.post("/api/form/submit", data);
      
      if (response.data.success) {
        setSubmissionStatus("success");
        reset();
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Request a Quote</h1>
      <p className="text-gray-600 mb-8 text-center">
        Discover how AI can boost your company's revenue, productivity, and overall workflow. Fill out the form below to get started.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="fromemail" className="block text-sm font-medium text-gray-700">Email*</label>
          <input id="fromemail" {...register("fromemail")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.fromemail && <p className="mt-2 text-sm text-red-600">{errors.fromemail.message}</p>}
        </div>

        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
          <input id="contactPerson" {...register("contactPerson")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input id="companyName" {...register("companyName")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        
        <div>
          <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">Company Website</label>
          <input id="companyWebsite" {...register("companyWebsite")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.companyWebsite && <p className="mt-2 text-sm text-red-600">{errors.companyWebsite.message}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input id="phoneNumber" {...register("phoneNumber")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input id="brandName" {...register("brandName")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
          <input id="budget" {...register("budget")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">Urgency</label>
          <input id="urgency" {...register("urgency")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">What are your requirements?*</label>
          <textarea id="requirements" {...register("requirements")} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.requirements && <p className="mt-2 text-sm text-red-600">{errors.requirements.message}</p>}
        </div>

        <div>
          <label htmlFor="questions" className="block text-sm font-medium text-gray-700">Do you have any questions for us?</label>
          <textarea id="questions" {...register("questions")} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information</label>
          <textarea id="additionalInfo" {...register("additionalInfo")} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
      {submissionStatus === "success" && (
        <div className="mt-4 text-center p-4 bg-green-100 text-green-800 rounded-md">
          Thank you for your submission! We will get back to you shortly.
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="mt-4 text-center p-4 bg-red-100 text-red-800 rounded-md">
          There was an error submitting your form. Please try again.
        </div>
      )}
    </div>
  );
};

export default Form;