import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AnyObjectSchema } from 'yup';

type FormWrapperProps<T extends AnyObjectSchema> = {
  schema: T; ///dèauvalue
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  options?: Parameters<typeof useForm>[0];
  className?: string;
  defaultValues?: any;
};

const HyperFormWrapper = <T extends AnyObjectSchema>({
  schema,
  onSubmit,
  children,
  options,
  className = '',
  defaultValues,
}: FormWrapperProps<T>) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    ...options,
    defaultValues: {
      ...defaultValues,
    },
  });
  // const currentValues = methods.watch(); // giá trị hiện tại
  // const isDirty =
  //   JSON.stringify(currentValues) !== JSON.stringify(defaultValues);

  // console.log('Check  isDirty', isDirty);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default HyperFormWrapper;
