export const paymentEndpoint = {
  uploadSlip: (bookingId: number) => `/payment/${bookingId}/slip`,
  updateStatus: (bookingId: number) => `/payment/${bookingId}/status`,
};
