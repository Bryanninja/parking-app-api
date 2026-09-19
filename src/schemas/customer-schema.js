import z from 'zod';

export const createCustomerSchema = z.object({
  name: z
    .string({
      error: 'Name is required.',
    })
    .trim()
    .min(1),
  phone: z
    .string()
    .trim()
    .min(1, {
      error: 'Phone not be null.',
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
      .min(1, { message: 'Name not be null .' })
      .optional(),
    phone: z
      .string()
      .trim()
      .min(1, { message: 'Phone not be null.' })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: 'At least a field must be informed.',
  });
export const updateCustomerParamsSchema = z.object({
  customerId: z.uuid({ message: 'The Customer id has to be a valid UUID.' }),
});
