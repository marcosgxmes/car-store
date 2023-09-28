import { useEffect, useContext } from 'react'
import logoimg from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { Container } from "../../components/container"

import { Input } from "../../components/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { auth } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { AuthContext } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório *"),
  email: z.string().email('Insira um email válido').nonempty('O campo email é obrigatório'),
  password: z.string().min(6, "A senha precisa ter no minímo 6 digitos").nonempty('O campo senha é obrigatório *')
})

type FormData = z.infer<typeof schema>

export function Register() {
  const { handleInfoUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })
  
  useEffect(() => {
    async function handleLogout() {
      await signOut(auth)
    }

    handleLogout();
  }, [])

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user) => {
      await updateProfile(user.user, {
        displayName: data.name
      })

      handleInfoUser({
        name: data.name,
        email: data.email,
        uid: user.user.uid
      })

      
      toast.success("Bem-vindo ao WebCarros!")
      navigate('/dashboard', {replace: true})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
   <Container>
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
      <Link to='/' className="mb-6 max-w-sm w-full">
        <img className="w-full" src={logoimg} alt="logo do site" />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-xl w-full rounded-lg p-4 "
      >
       <div className="mb-3">
       <Input
          type='text'
          placeholder='Digite seu nome completo'
          name='name'
          error={errors.name?.message}
          register={register}
        />
       </div>

       <div className="mb-3">
       <Input
          type='email'
          placeholder='Digite seu email'
          name='email'
          error={errors.email?.message}
          register={register}
        />
       </div>

       <div className="mb-3">
       <Input
          type='password'
          placeholder='Digite sua senha'
          name='password'
          error={errors.password?.message}
          register={register}
        />
       </div>

        <button
        className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium "
          type="submit"
        >
          Cadastrar
        </button>
      </form>

      <Link to='/login'>
        Já possui uma conta? Faça Login aqui!
      </Link>

    </div>
   </Container>
  )
}
