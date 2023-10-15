import { useUserRegistrationMutation } from '@/redux/api/authApi'
import toast from 'react-hot-toast'
import Form from './form/Form'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Registration = ({ setIsLogin }: { setIsLogin?: any }) => {
  const [userRegistration] = useUserRegistrationMutation()

  const gender = [
    {
      key: 'Male',
      value: 'Male'
    },
    {
      key: 'Female',
      value: 'Female'
    },
    {
      key: 'Others',
      value: 'Others'
    }
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginHandler = async (data: any) => {
    const username = data?.username?.value
    const firstName = data?.firstName?.value
    const lastName = data?.lastName?.value
    const email = data?.email?.value
    const number = data?.number?.value
    const gender = data?.gender?.value
    const password = data?.password?.value

    const res = await userRegistration({
      username,
      name: {
        firstName,
        lastName
      },
      email: {
        address: email,
        is_verified: true
      },
      number: {
        cc: '+880',
        digits: number.substring(1),
        is_verified: true
      },
      gender,
      password
    }).unwrap()

    if (res.status) {
      toast.success('Registration successfull. Please login.')
      data.reset()
      if (setIsLogin) setIsLogin(true)
    } else {
      toast.error('Somthing is wrong, try again')
    }
  }

  return (
    <div className="border p-5 md:p-10">
      <Form submitHandler={loginHandler}>
        <TextField label="Username" name="username" required={true} />
        <div className="grid grid-cols-2 gap-x-4">
          <TextField label="First Name" name="firstName" required={true} />
          <TextField label="Last Name" name="lastName" required={true} />
          <TextField label="Email" name="email" required={true} />
          <TextField label="Number" name="number" required={true} />
        </div>
        <SelectField label="Gender" name="gender" required={true} data={gender} />
        <TextField label="Password" name="password" required={true} />
        <SubmitButton title="Register Now" />
      </Form>
    </div>
  )
}

export default Registration
