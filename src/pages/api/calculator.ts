// import { NextApiRequest, NextApiResponse } from 'next';
// import { Calculator } from '@/app/algorithm/calculator';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const calculator = new Calculator();

//   try {
//     const query = req.query.q as string; // Get the "q" query parameter from the request URL
//     calculator.query(query);

//     const result = calculator.getResult();
//     console.log('The result is:', result);
//   } catch (error) {
//     const errorMessage = error as string; // explicitly define the type of the error variable
//     console.error(errorMessage);
//   }
// }
