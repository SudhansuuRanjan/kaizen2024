import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PaymentInitModal } from 'pg-test-project';
import { Select, Input } from '../../components/Form';
import { useForm } from 'react-hook-form';
import { createInternalTransaction, updateInternalTransaction, getInternalTransactions } from '../../services/doc.service';

const generateTxnId = () => {
  const chars = '0123456789';
  const stringLength = 10;
  let randomString = '';
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum + 1);
  }
  return randomString;
};

const Alumni = () => {
  document.title = 'Internal Collection | KAIZEN 2024';
  const navigate = useNavigate();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ trim: true });
  const [paymentCredentials, setPaymentCredentials] = useState({
    isOpen: false,
    clientCode: import.meta.env.VITE_PAYMENT_CLIENT_CODE,
    transUserName: import.meta.env.VITE_PAYMENT_USERNAME,
    txtnId: '',
    transUserPassword: import.meta.env.VITE_PAYMENT_PASSWORD,
    authkey: import.meta.env.VITE_PAYMENT_AUTH_KEY,
    authiv: import.meta.env.VITE_PAYMENT_AUTH_IV,
    callbackUrl: `${import.meta.env.VITE_APP_SUPABASE_REDIRECT_URI}/alumni-connect`,
    name: '',
    email: '',
    phone: '',
    address: 'Patna, Bihar',
    amount: 0,
    udf1: "", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: "",
    env: 'prod'
  });
  const [loading, setLoading] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  const getJsonFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObject = {};
    for (const [key, value] of queryParams.entries()) {
      paramsObject[key] = value;
    }
    return paramsObject;
  };

  const getQueryParams = async () => {
    const params = getJsonFromUrl();
    if (!params.status) return;

    if (params.status === 'SUCCESS') {
      await handlePaymentSuccess(params);
      navigate('/');
    } else if (params.status === 'FAILED') {
      await handlePaymentFailed(params);
      toast.error('Payment Failed! If your money has been debited please contact Administrator. Err code 3');
      navigate('/');
    } else if (params.status === 'CANCELLED') {
      toast.error('Payment Cancelled! Err code 4');
      navigate('/');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const txnId = generateTxnId();

    try {
      const details = {
        ...data,
        txnid: txnId,
      };
      toast.success('Proceeding to Payment...');
      await createInternalTransaction('internalpayments', details);
      console.log({
        ...paymentCredentials,
        name: data.name,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        isOpen: true,
        txtnId: txnId,
      });
      setPaymentCredentials({
        ...paymentCredentials,
        name: data.name,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        isOpen: true,
        txtnId: txnId,
      });
    } catch (error) {
      console.log(error);
      toast.error('Some error occurred! Please try again later!');
    }
    setLoading(false);
  };

  const handlePaymentSuccess = async (params) => {
    try {
      setVerifyingPayment(true);
      if (params.clientTxnId) {
        const txnId = params.clientTxnId;
        const txnClient = await getInternalTransactions('internalpayments', txnId);
        if (txnClient.length > 0) {
          const data = txnClient[0];
          await updateInternalTransaction('internalpayments', txnId, {
            ...data,
            status: 'SUCCESS',
            paymentVerified: true,
            paymentData: params,
          });
          toast.success('Payment Successful! Thank you for your contribution!');
        } else {
          toast.error('Something went wrong! Please try again later. If your money has been debited, please contact us.');
        }
      } else {
        toast.error('Something went wrong! Please try again later. If your money has been debited, please contact us.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Some error occurred! Please try again later!');
    }
    setVerifyingPayment(false);
  };

  const handlePaymentFailed = async (params) => {
    try {
      setVerifyingPayment(true);
      if (params.clientTxnId) {
        const txnId = params.clientTxnId;
        const txnClient = await getInternalTransactions('internalpayments', txnId);
        if (txnClient.length > 0) {
          const data = txnClient[0];
          await updateInternalTransaction('internalpayments', txnId, {
            ...data,
            status: 'FAILED',
            paymentData: params,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Some error occurred! Please try again later!');
    }
    setVerifyingPayment(false);
  }

  useEffect(() => {
    getQueryParams();
  }, []);

  return (
    <div className='bg-black pb-24'>
      <div className='cart-banner'>
        <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Internal Collection</h1>
      </div>

      <div className='lg:w-[37rem] md:w-[32rem] w-[90%] m-auto font-medium'>
        <p className='mb-5 text-2xl'>Respected Sir/Ma'am,</p>
        <p className='text-lg'>Warm greetings from Team <span className='text-yellow-500'>KAIZEN!</span></p>
        <p className='text-lg pt-2'>We hope to see you in <span className='text-yellow-500'>KAIZEN!</span> this year!</p>
      </div>

      {loading && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'></div>
          <p>Proceeding to Payment...</p>
          <p>Please do not close this window or press back button.</p>
        </div>
      )}

      {verifyingPayment && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'></div>
          <p>Verifying Payment...</p>
          <p>Please do not close this window or press back button.</p>
        </div>
      )}

      <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-gray-900 rounded-2xl text-gray-700 m-auto mt-24'>
        <div>
          <h1 className='text-3xl text-center font-semibold bg-gray-800 border-b border-gray-900 rounded-2xl p-5 shadow text-yellow-500'>Contribute</h1>
        </div>

        <div className='my-3'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3.5 flex-col w-full p-4 px-5'>
            <Input
              label='Name'
              type='text'
              placeholder='Captain Jack Sparrow'
              title='name'
              reactHookForm={register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 256,
                  message: 'Name must not exceed 256 characters',
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.name}
            />

            <Input
              label="Email"
              type="email"
              placeholder="jack@pirate.co"
              title="email"
              reactHookForm={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                  message: 'Email must be a valid email address',
                },
                maxLength: {
                  value: 256,
                  message: 'Email must not exceed 256 characters',
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.email}
            />

            <Input
              label="Mobile No."
              type="text"
              placeholder="9132456778"
              title="phone"
              reactHookForm={register('phone', {
                required: 'Mobile No. is required',
                pattern: {
                  value: /^[6789][0-9]{9}$/,
                  message: 'Please enter valid phone number',
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.phone}
            />

            <Input
              label="Address"
              type="text"
              placeholder="Patna"
              require={true}
              title="address"
              reactHookForm={register('address', {
                required: 'Current City is required',
                minLength: {
                  value: 2,
                  message: 'Current City must be at least 2 characters',
                },
                maxLength: {
                  value: 256,
                  message: 'Current City must not exceed 256 characters',
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.address}
            />

            <Select
              label='Designation'
              id='designation'
              require={true}
              options={[
                { name: 'resident', value: 'resident' },
              ]}
              reactHookForm={register('designation', {
                required: 'Designation is required',
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.designation}
              placeholder="Select Designation"
            />

            <Input
              label="Amount"
              type="number"
              placeholder="Amount"
              title="amount"
              value={1600}
              reactHookForm={register('amount', {
                required: 'Amount is required',
                min: {
                  value: 10,
                  message: 'Minimum amount is 10',
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.amount}
            />

            <div className='flex flex-col w-full mt-5'>
              <button className='bg-yellow-500 text-gray-900 py-2.5 my-3 rounded-lg font-semibold' type="submit">Contribute</button>
            </div>
          </form>
        </div>
      </div>

      <PaymentInitModal
        amount={String(paymentCredentials.amount)}
        payerMobile={paymentCredentials.phone}
        payerName={paymentCredentials.name}
        payerEmail={paymentCredentials.email}
        payerAddress={paymentCredentials.address}
        clientCode={paymentCredentials.clientCode}
        transUserPassword={paymentCredentials.transUserPassword}
        transUserName={paymentCredentials.transUserName}
        callbackUrl={paymentCredentials.callbackUrl}
        isOpen={paymentCredentials.isOpen}
        authkey={paymentCredentials.authkey}
        authiv={paymentCredentials.authiv}
        env={paymentCredentials.env}
        clientTxnId={paymentCredentials.txtnId}
        amountType={'INR'}
        label={'prod'}
      />
    </div>
  );
};

export default Alumni;
