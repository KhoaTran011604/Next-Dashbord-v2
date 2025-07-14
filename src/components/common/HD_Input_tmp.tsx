import { useFormContext } from 'react-hook-form';
import { InputFieldProps } from 'types/MainType';

const HD_Input_Tmp = ({
  title,
  isItemForm = false,
  name,
  type = 'text',
  data,
  setData,
}) => {
  const InputField = ({
    name,
    type,
    value = '',
    onChange,
  }: InputFieldProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="mb-4">
        <input
          type={type}
          {...register(name)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={name}
          defaultValue={value}
          onBlur={onChange}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  };
  return (
    <>
      {title && (
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {title}
        </label>
      )}
      <InputField
        name={name}
        type={type}
        value={data[name]}
        onChange={(e) => {
          setData({
            ...data,
            [name]: e.target.value,
          });
        }}
      />
    </>
  );
};

export default HD_Input_Tmp;
