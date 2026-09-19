import z from 'zod';

export const createCustomerSchema = z.object({
  name: z
    .string({
      error: 'Name is required.',
    })
    .trim()
    .min(2, {
      error: 'Name must have at least 2 characters.',
    }),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => /^\d{10,11}$/.test(val), {
      message: 'Phone number must include DDD and 10 or 11 digits.',
    })
    .optional(),
});

export const deleteCustomerParamsSchema = z.object({
  customerId: z.uuid({ error: 'The Customer id has to be a valid UUID.' }),
});

export const updateCustomerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: 'Name must have at least 2 characters.',
      })
      .optional(),
    phone: z
      .string()
      .trim()
      .transform((val) => val.replace(/\D/g, ''))
      .refine((val) => /^\d{10,11}$/.test(val), {
        message: 'Phone number must include DDD and 10 or 11 digits.',
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: 'At least one field must be informed.',
  });
export const updateCustomerParamsSchema = z.object({
  customerId: z.uuid({ message: 'The Customer id has to be a valid UUID.' }),
});
