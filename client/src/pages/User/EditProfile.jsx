import useAuth from '../../hooks/useAuth';
import { updateUserProfile } from '../../services/doc.service';
import { toast } from 'react-toastify';
import { Input, Select } from '../../components/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AuthSuccess = () => {
    const { user, session } = useAuth();
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({ trim: true });


    const onSubmit = async (data) => {
        try {
            await updateUserProfile('profiles', session.user.id, data);
            toast.success('User updated successfully');
            navigate('/profile');
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating user');
        } finally {
            reset();
        }
    };

    useState(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('gender', user.gender || '');
            setValue('mobile', user.mobile || '');
            setValue('college', user.college || '');
            setValue('address', user.address || '');
        }
    }, [user]);

    return (
        <div className='flex items-center justify-center bg-black py-32'>
            <div className="border border-gray-900 lg:w-[32rem] md:w-[24rem] w-full mx-2 rounded-2xl p-5 bg-gray-800 text-gray-200 shadow-lg">
                <div className='rounded'>
                    <h1 className='text-2xl font-semibold mb-3'>Edit Profile</h1>
                    <p className='text-gray-400 mb-5'>Please complete your profile to continue</p>
                    <form className='flex gap-3 flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label='Name'
                            type='text'
                            placeholder='Your Name'
                            title='name'
                            require={true}
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
                            })}
                            className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
                            errors={errors.email}
                            disabled
                        />

                        <Select
                            label='Gender'
                            id='Gender'
                            require={true}
                            options={[
                                {
                                    name: 'Male',
                                    value: 'Male',
                                },
                                {
                                    name: 'Female',
                                    value: 'Female',
                                },
                                {
                                    name: 'Others',
                                    value: 'Others',
                                }
                            ]}
                            reactHookForm={register('gender', {
                                required: 'Gender is required',
                            })}
                            className='bg-gray-950 rounded-lg px-3 py-2 mt-1 w-full text-gray-300'
                            errors={errors.gender}
                            placeholder="Select gender"
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
                                    value: 16,
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

                        <button type='submit' className='w-full py-2.5 rounded-lg bg-rose-500 hover:bg-rose-600 font-medium'>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthSuccess;
