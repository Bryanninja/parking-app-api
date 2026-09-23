const HOURLY_RATE = 10.0; // R$ 10,00 por hora
const TOLERANCE_MINUTES = 15; // 15 minutos de tolerância

// Simulando uma entrada às 10:00
const checkIn = new Date('2026-09-22T10:00:00');
const checkOut = new Date('2026-09-22T10:16:00');

const getPricePark = () => {
  const diffInMilliseconds = checkOut.getTime() - checkIn.getTime();
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  if (diffInMinutes <= TOLERANCE_MINUTES) return 0;

  const fullHours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;

  let billedHours = fullHours;

  if (fullHours === 0) {
    billedHours = 1;
  } else if (remainingMinutes > TOLERANCE_MINUTES) {
    billedHours += 1;
  }

  const totalAmount = billedHours * HOURLY_RATE;

  console.log(totalAmount);
};

console.log(getPricePark());
