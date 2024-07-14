import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getDocumentByQuery, updateUserDoc, createUserDoc } from '../../services/doc.service';
import { toast } from 'react-toastify';
import { Input } from '../../components/Form';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ trim: true });

  const { data: userProfile } = useQuery({
    queryKey: ['user', user.email],
    queryFn: () => getDocumentByQuery('users', "email", user.email),
    onSuccess: (data) => {
      console.log(data);
    }
  })

  useEffect(() => {
    const createUser = async () => {
      try {
        const data = {
          name: user.name,
          email: user.email,
        };
        const res = await createUserDoc('users', data, user);
      } catch (error) {
        toast.error('An error occurred while creating user');
      }
    };

    if (user) {
      createUser();
    }
  }, []);


  const onSubmit = async (data) => {
    try {
      await updateUserDoc('users', userProfile.$id, data);
      toast.success('User updated successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('An error occurred while updating user');
    } finally {
      reset();
    }
  };

  const checkUserProfileisComplete = () => {
    if (userProfile) {
      if (userProfile.mobile && userProfile.college && userProfile.address) {
        navigate('/profile');
      }
    }
  }

  useEffect(() => {
    checkUserProfileisComplete();
  }, [userProfile]);

  // https://cloud.appwrite.io/v1/avatars/initials?name=Sudhanshu+Ranjan&width=80&height=80
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="border border-gray-800 lg:w-[32rem] md:w-[24rem] w-full mx-2 rounded-2xl p-5">
        <div className='rounded'>

          <h1 className='text-2xl font-semibold'>Complete Your Profile</h1>
          <p className='text-gray-400'>Please complete your profile to continue</p>
          <form className='flex gap-3 flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label='Name'
              type='text'
              placeholder='Your Name'
              title='name'
              require={true}
              reactHookForm={register('name', {
                required: 'Name is required',
                minLength: {
                  value: 5,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 256,
                  message: 'Name must not exceed 256 characters',
                },
                value: user.name
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.name}
              disabled
            />

            <Input
              label="Email"
              type="email"
              placeholder="Email ID"
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
                value: user.email
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.email}
              disabled
            />

            <Input
              label='Mobile No.'
              type='text'
              require={true}
              placeholder='Phone'
              title='mobile'
              reactHookForm={register('mobile', {
                required: 'Mobile no. is required for sending updates.',
                minLength: {
                  value: 10,
                  message: 'Mobile no. must be 10 characters or more'
                },
                maxLength: {
                  value: 14,
                  message: 'Mobile no. must not exceed 14 characters'
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.mobile}
            />

            <Input
              label='College / Institute'
              type='text'
              placeholder='AIIMS, Patna'
              title='college'
              require={true}
              reactHookForm={register('college', {
                required: 'College name is required',
                minLength: {
                  value: 3,
                  message: 'College name must be at least 3 characters',
                },
                maxLength: {
                  value: 256,
                  message: 'College name must not exceed 256 characters',
                },
              })}
              className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
              errors={errors.college}
            />


            <Input
              label="Your Current City"
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

            <button type='submit' className='w-full py-2.5 rounded-lg bg-rose-500 font-medium'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthSuccess;