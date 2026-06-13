import { z } from "zod";

export const personalStepSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  city: z.string().min(2, { message: "City is required." }),
});

export const interestStepSchema = z.object({
  interests: z.array(z.string()).min(1, { message: "Please select at least one area of interest." }),
});

export const availabilityStepSchema = z.object({
  availability: z.enum(["Weekdays", "Weekends", "Both"], {
    message: "Please select your availability.",
  }),
  hoursPerWeek: z.enum(["2-5", "5-10", "10+"], {
    message: "Please select hours per week.",
  }),
  message: z.string().optional(),
});

export const volunteerRegistrationSchema = z.object({
  ...personalStepSchema.shape,
  ...interestStepSchema.shape,
  ...availabilityStepSchema.shape,
});

export type PersonalStepValues = z.infer<typeof personalStepSchema>;
export type InterestStepValues = z.infer<typeof interestStepSchema>;
export type AvailabilityStepValues = z.infer<typeof availabilityStepSchema>;
export type VolunteerFormValues = z.infer<typeof volunteerRegistrationSchema>;
