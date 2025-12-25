import { Box, Button, EmptyState, Heading, Text } from "@chakra-ui/react";
import { useAccountProfile } from "./useAccountProfile";
import { useUpdateAccountProfile } from "./useUpdateAccountProfile";
import { LuCircleAlert } from "react-icons/lu";
import { InlineEdit } from "@/components/InlineEdit";
import { supabase } from "@/lib/supabase.lib";

export default function AccountProfilePage() {
  const { profile, error } = useAccountProfile();
  const updateProfile = useUpdateAccountProfile();

  if (error) {
    return (
      <EmptyState.Root mt={4}>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuCircleAlert />
          </EmptyState.Indicator>
          <EmptyState.Title>Error</EmptyState.Title>
          <EmptyState.Description>
            An error occurred while fetching your account profile.
          </EmptyState.Description>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Box mt={4}>
      <Heading>Account Settings</Heading>
      <Box mt={4}>
        <Heading size="md">Display Name</Heading>
        <InlineEdit
          value={profile.displayName}
          onSave={(name) => updateProfile({ display_name: name })}
        />

        <Heading size="md" mt={2}>
          Email
        </Heading>
        <Text>{profile.email}</Text>
      </Box>
      <Box mt={4}>
        <Heading size="md">Your Apps</Heading>
        <Text color="fg.muted">
          Your account is used on the following apps:
        </Text>
        <Box mt={2}>
          {profile.accessedApps.length === 0 && <Text>No Apps</Text>}
          <Text>{profile.accessedApps.join(", ")}</Text>
        </Box>
      </Box>
      <Box mt={8}>
        <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
      </Box>
    </Box>
  );
}
