import z from 'zod';

// Regex universal de placas brasileiras (antiga e Mercosul)
const licensePlateRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;

export const createTicketSchema = z.object({
  customer_id: z.uuid({
    error: 'The Customer id has to be a valid UUID.',
  }),

  vehicle_model: z
    .string({ error: 'Vehicle model is required.' })
    .trim()
    .min(1, { error: 'Vehicle model is required.' }),

  license_plate: z
    .string({ error: 'License plate is required.' })
    .trim()
    // 1. Deixa tudo maiúsculo e remove traços e espaços
    .transform((val) => val.toUpperCase().replace(/[^A-Z0-9]/g, ''))
    // 2. Valida com o Regex universal
    .refine((val) => licensePlateRegex.test(val), {
      error: 'Invalid license plate. accept formats: ABC1234 ou ABC1D23.',
    }),
});

export const checkOutTicketParamsSchema = z.object({
  ticketId: z.uuid({ error: 'The id has to be a valid UUID.' }),
});

export const checkOutTicketSchema = z.object({
  payment_method: z.enum(['CASH', 'CARD', 'PIX'], {
    error: 'The payment methods allowed are: CASH, CARD or PIX.',
  }),
});
