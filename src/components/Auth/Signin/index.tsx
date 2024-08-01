"use client";
import { PasswordIcon, UserIcon } from "@/assets";
import { useLogin } from "@/helper/data/account.loader";
import { login } from "@/lib/account.action";
import { Button, Checkbox } from "@nextui-org/react";
import Link from "next/link";

export default function SignIn() {
  const { trigger, error, isMutating } = useLogin();

  const handleLogin = (formData: FormData) => {
    const payload = {
      username: formData.get("username")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    trigger(payload).then((data) => {
      login(data);
    });
  };

  return (
    <form action={handleLogin}>
      <div className='mb-4'>
        <label
          htmlFor='username'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Tên đăng nhập
        </label>
        <div className='relative'>
          <input
            placeholder='Nhập tên đăng nhập'
            name='username'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <UserIcon />
          </span>
        </div>
      </div>

      <div className='mb-5'>
        <label
          htmlFor='password'
          className='mb-2.5 block font-medium text-dark dark:text-white'>
          Mật khẩu
        </label>
        <div className='relative'>
          <input
            type='password'
            name='password'
            placeholder='Nhập mật khẩu'
            autoComplete='password'
            className='w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            required
          />

          <span className='absolute right-4.5 top-1/2 -translate-y-1/2'>
            <PasswordIcon />
          </span>
        </div>
      </div>

      <div>
        <p className='text-red-600'>{error?.response?.data?.message}</p>
      </div>

      <div className='mb-6 flex items-center justify-between gap-2 py-2'>
        <Checkbox>Ghi nhớ đăng nhập</Checkbox>
        <Link
          href='/auth/forgot-password'
          className='select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary'>
          Quên mật khẩu?
        </Link>
      </div>

      <div className='mb-4.5'>
        <Button
          type='submit'
          isLoading={isMutating}
          className='flex w-full rounded-lg bg-primary p-4 font-medium text-white'>
          Đăng nhập
        </Button>
      </div>
    </form>
  );
}
