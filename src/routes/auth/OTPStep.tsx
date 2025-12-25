import z from "zod";
import { Button, Card, Field, PinInput } from "@chakra-ui/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";

const schema = z
  .object({
    code: z.string().min(6).max(6).regex(/^\d+$/),
  })
  .required();

export type OTPStepData = z.infer<typeof schema>;

interface OTPStepProps {
  onSubmit: (data: OTPStepData) => Promise<void>;
}

export function OTPStep(props: OTPStepProps) {
  const { onSubmit } = props;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    disabled: loading,
  });

  const submitLoader = (values: OTPStepData) => {
    setLoading(true);
    return onSubmit(values).finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(submitLoader)}>
      <Card.Body>
        <Card.Description>
          We have sent a code to your email. Please enter it below.
        </Card.Description>
        <Field.Root mt={4} invalid={errors.code ? true : false}>
          <Field.Label>Code</Field.Label>
          <PinInput.Root>
            <PinInput.HiddenInput {...register("code")} />
            <PinInput.Control>
              <PinInput.Input index={0} />
              <PinInput.Input index={1} />
              <PinInput.Input index={2} />
              <PinInput.Input index={3} />
              <PinInput.Input index={4} />
              <PinInput.Input index={5} />
            </PinInput.Control>
          </PinInput.Root>
          {errors.code && (
            <Field.ErrorText>{errors.code.message}</Field.ErrorText>
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
