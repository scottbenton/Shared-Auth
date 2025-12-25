import { Button, Card, Field, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";

const schema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
  })
  .required();

export type RegisterFormStepData = z.infer<typeof schema>;

interface RegisterFormStepProps {
  initialValues?: RegisterFormStepData;
  onSubmit: (data: RegisterFormStepData) => Promise<void>;
}

export function RegisterFormStep(props: RegisterFormStepProps) {
  const { initialValues, onSubmit } = props;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    disabled: loading,
  });

  const submitLoader = (values: RegisterFormStepData) => {
    setLoading(true);
    return onSubmit(values).finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(submitLoader)}>
      <Card.Body>
        <Field.Root invalid={errors.name ? true : false}>
          <Field.Label>Name</Field.Label>
          <Input {...register("name")} />
          {errors.name && (
            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root mt={4} invalid={errors.email ? true : false}>
          <Field.Label>Email Address</Field.Label>
          <Input {...register("email")} type="email" />
          {errors.email && (
            <Field.ErrorText>{errors.email.message}</Field.ErrorText>
          )}
        </Field.Root>
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"}>
        <Button loading={loading} type="submit" colorPalette={"blue"}>
          Create Account
        </Button>
      </Card.Footer>
    </form>
  );
}
