import { Flex, Tabs } from "@chakra-ui/react";
import { ScottsAppsIcon } from "./ScottsAppsIcon";
import { ColorModeButton } from "../ui/color-mode";
import { useAuthState } from "@/context/AuthProvider";
import { Link, useLocation } from "wouter";

export function Header() {
  const uid = useAuthState().uid;

  const [location, navigate] = useLocation();

  return (
    <Flex align="center" justify="space-between" py={1}>
      <ScottsAppsIcon />
      <Flex align="center" gap={1}>
        <Tabs.Root
          variant="subtle"
          value={location}
          navigate={({ value }) => navigate(value)}
        >
          <Tabs.List>
            <Tabs.Trigger value="/" asChild>
              <Link to="/">Apps</Link>
            </Tabs.Trigger>
            {!uid && (
              <>
                <Tabs.Trigger value="/login" asChild>
                  <Link to="/login">Login</Link>
                </Tabs.Trigger>
                <Tabs.Trigger value="/register" asChild>
                  <Link to="/register">Register</Link>
                </Tabs.Trigger>
              </>
            )}
            {uid && (
              <Tabs.Trigger value="/profile" asChild>
                <Link to="/profile">Profile</Link>
              </Tabs.Trigger>
            )}
          </Tabs.List>
        </Tabs.Root>
      </Flex>
      <ColorModeButton />
    </Flex>
  );
}
