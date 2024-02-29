// Запрос в виде платежа
// {
//   "sum": 10000,
//   "from": 2,
//   "to": 4
// }
// Ответ
// {
//   "status": "success",
//   "data": {
//       "databaseId": 567,
//       "sum": 10000,
//       "from": 2,
//       "to": 4
//   }
// },
// {
//   "status": "failed",
//   "data": {
//       "errorMessage": "Недостаточно средств",
//       "errorCode": 4
//   }
// }

interface Payment {
  sum: number,
  from: number,
  to: number,
}

enum PaymentStatuses {
  SUCCESS = 'success',
  FAILED = 'failed',
}

interface PaymentRequest extends Payment {};

interface DataSuccessResponse extends Payment {
  databaseId: number;
}

interface DataFailedResponse {
  errorMessage: string,
  errorCode: number,
}

interface PaymentSuccessResponse {
  status: PaymentStatuses.SUCCESS,
  data: DataSuccessResponse,
}

interface PaymentFailedResponse {
  status: PaymentStatuses.FAILED,
  data: DataFailedResponse,
}

function isPaymentSuccessful(response: PaymentSuccessResponse | PaymentFailedResponse): response is PaymentSuccessResponse {
  return response.status === 'success';
}

type CheckFunc = (response: PaymentSuccessResponse | PaymentFailedResponse) => number;

const CheckFunc: CheckFunc = (response) => {
  if (isPaymentSuccessful(response)) {
    return response.data.databaseId;
  } else {
    throw new Error(response.data.errorMessage)
  }
};