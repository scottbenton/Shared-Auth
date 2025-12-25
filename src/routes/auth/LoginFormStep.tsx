import { Button, Card, Field, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";

const schema = z
  .object({
    email: z.string().email(),
  })
  .required();

export type LoginFormStepData = z.infer<typeof schema>;

interface LoginFormStepProps {
  initialValues?: LoginFormStepData;
  onSubmit: (data: LoginFormStepData) => Promise<void>;
}

export function LoginFormStep(props: LoginFormStepProps) {
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

  const submitLoader = (values: LoginFormStepData) => {
    setLoading(true);
    return onSubmit(values).finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(submitLoader)}>
      <Card.Body>
        <Field.Root invalid={errors.email ? true : false}>
          <Field.Label>Email Address</Field.Label>
          <Input {...register("email")} type="email" />
          {errors.email && (
            <Field.ErrorText>{errors.email.message}</Field.ErrorText>
          )}
        </Field.Root>
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"}>
        <Button loading={loading} type="submit" colorPalette={"blue"}>
          Send Login Code
        </Button>
      </Card.Footer>
    </form>
  );
}
