import { Card, Center } from "@chakra-ui/react";
import { useState } from "react";
import {
  RegisterFormStep,
  type RegisterFormStepData,
} from "../RegisterFormStep";
import { supabase } from "@/lib/supabase.lib";
import { OTPStep, type OTPStepData } from "../OTPStep";
import { Link } from "@/components/Link";

export default function RegisterPage() {
  const [data, setData] = useState<RegisterFormStepData | null>(null);

  const sendOTP = (formData: RegisterFormStepData) => {
    return new Promise<void>((resolve, reject) => {
      supabase.auth
        .signInWithOtp({
          email: formData.email,
        })
        .then((response) => {
          if (response.error) {
            reject(response.error);
          } else {
            setData(formData);
            resolve();
          }
        })
        .catch(reject);
    });
  };

  const verifyOTPAndUpdateUser = ({ code }: OTPStepData) => {
    return new Promise<void>((resolve, reject) => {
      if (!data) {
        reject(new Error("No data found."));
        return;
      }
      supabase.auth
        .verifyOtp({
          email: data.email,
          token: code,
          type: "email",
        })
        .then((result) => {
          if (result.error) {
            reject(result.error);
          } else {
            const id = result.data.user?.id;
            if (!id) {
              console.error("User ID not found, cannot update user profile.");
              resolve();
              return;
            }
            supabase
              .from("user_profiles")
              .update({ display_name: data.name })
              .eq("id", id)
              .then((result) => {
                if (result.error) {
                  console.error("Failed to update user profile:", result.error);
                }
              });

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
          <Card.Title>Create an Account</Card.Title>
          <Card.Description mt={2}>
            Already have an account?{" "}
            <Link to="/login" colorPalette={"blue"}>
              Login
            </Link>
          </Card.Description>
        </Card.Body>
        {!data && <RegisterFormStep onSubmit={sendOTP} />}
        {data && <OTPStep onSubmit={verifyOTPAndUpdateUser} />}
      </Card.Root>
    </Center>
  );
}
