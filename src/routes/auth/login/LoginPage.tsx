import { Card, Center } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "@/lib/supabase.lib";
import { OTPStep, type OTPStepData } from "../OTPStep";
import { Link } from "@/components/Link";
import { LoginFormStep, type LoginFormStepData } from "../LoginFormStep";

export default function LoginPage() {
  const [email, setEmail] = useState<string | null>(null);

  const sendOTP = (formData: LoginFormStepData) => {
    return new Promise<void>((resolve, reject) => {
      supabase.auth
        .signInWithOtp({
          email: formData.email,
        })
        .then((response) => {
          if (response.error) {
            reject(response.error);
          } else {
            setEmail(formData.email);
            resolve();
          }
        })
        .catch(reject);
    });
  };

  const verifyOTP = ({ code }: OTPStepData) => {
    return new Promise<void>((resolve, reject) => {
      if (!email) {
        reject(new Error("No email found."));
        return;
      }
      supabase.auth
        .verifyOtp({
          email,
          token: code,
          type: "email",
        })
        .then((result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  };

  return (
    <Center mt={12}>
      <Card.Root size="md" maxW="sm" w="100%">
        <Card.Body pb={0}>
          <Card.Title>Log in to your account</Card.Title>
          <Card.Description mt={2}>
            Need an account?{" "}
            <Link to="/register" colorPalette={"blue"}>
              Create an Account
            </Link>
          </Card.Description>
        </Card.Body>
        {!email && <LoginFormStep onSubmit={sendOTP} />}
        {email && <OTPStep onSubmit={verifyOTP} />}
      </Card.Root>
    </Center>
  );
}
