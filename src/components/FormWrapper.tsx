import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AnyObjectSchema } from 'yup';

type FormWrapperProps<T extends AnyObjectSchema> = {
  schema: T;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  options?: Parameters<typeof useForm>[0];
  className?: string;
};

const FormWrapper = <T extends AnyObjectSchema>({
  schema,
  onSubmit,
  children,
  options,
  className = '',
}: FormWrapperProps<T>) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    ...options,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
