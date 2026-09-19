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

export const updateCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'O nome não pode estar vazio.' })
    .optional(),
  phone: z
    .string()
    .trim()
    .min(1, { message: 'O telefone não pode estar vazio.' })
    .optional(),
});
export const updateCustomerParamsSchema = z.object({
  customerId: z.uuid({ message: 'The Customer id has to be a valid UUID.' }),
});
