import {
  TicketNotFoundError,
  TicketAlreadyPaidError,
} from '../../errors/ticket.js';

const HOURLY_RATE = 10.0; // R$ 10,00 por hora
const TOLERANCE_MINUTES = 15; // 15 minutos de tolerância

export class CheckOutTicketUseCase {
  constructor(updateTicketByIdRepository, getTicketByIdRepository) {
    this.updateTicketByIdRepository = updateTicketByIdRepository;
    this.getTicketByIdRepository = getTicketByIdRepository;
  }

  async execute(ticketId, paymentMethod) {
    // 1. Busca o ticket no banco
    const ticket = await this.getTicketByIdRepository.execute(ticketId);
    if (!ticket) {
      throw new TicketNotFoundError(ticketId);
    }

    // 2. Proteção: Se já foi pago, barra na hora!
    if (ticket.status === 'PAID') {
      throw new TicketAlreadyPaidError(ticketId);
    }

    // 3. Momento exato da saída (gerado pelo SERVIDOR, nunca pelo cliente!)
    const checkOutDate = new Date();

    // 4. Cálculo da estadia em minutos
    const diffInMilliseconds =
      checkOutDate.getTime() - ticket.check_in.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    let totalAmount = 0;

    // Só calcula e cobra horas se passou da tolerância inicial de 15 minutos:
    if (diffInMinutes > TOLERANCE_MINUTES) {
      const fullHours = Math.floor(diffInMinutes / 60);
      const remainingMinutes = diffInMinutes % 60;

      let billedHours = fullHours;

      if (fullHours === 0) {
        billedHours = 1;
      } else if (remainingMinutes > TOLERANCE_MINUTES) {
        billedHours += 1;
      }

      totalAmount = billedHours * HOURLY_RATE;
    }
    // 5. Atualiza o ticket no banco com os dados finais
    const finalizedTicket = await this.updateTicketByIdRepository.execute(
      ticketId,
      {
        check_out: checkOutDate,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        status: 'PAID',
      },
    );
    return finalizedTicket;
  }
}
