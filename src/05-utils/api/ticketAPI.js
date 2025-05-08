import { ticket } from '../../04-data/ticketDummy';

export function getTicketDetail(id) {
  // 실제로는 axios.get(`/api/ticket/${id}`) 등으로 구현
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ticket);
    }, 500); // 0.5초 후 더미 데이터 반환
  });
} 