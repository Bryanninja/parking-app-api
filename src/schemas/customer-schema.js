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
  id: z.uuid({ error: 'The Customer id has to be a valid UUID.' }),
});
