import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import { supabase } from "./supabase.lib";
import type { Database } from "@/types/supabase-generated.type";

type TableNames = keyof Database["public"]["Tables"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CreateSubscriptionParams<T extends Record<string, any>> {
  channelName: string;
  table: TableNames;
  filter: string | string[];
  startInitialLoad: () => void;
  onPayload: (payload: RealtimePostgresChangesPayload<T>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSubscription<T extends { [key: string]: any }>(
  params: CreateSubscriptionParams<T>,
) {
  const { channelName, table, filter, startInitialLoad, onPayload } = params;

  startInitialLoad();

  const createSubscription = () => {
    let channel = supabase.channel(channelName);

    if (Array.isArray(filter)) {
      filter.forEach((f) => {
        channel = channel.on<T>(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table,
            filter: f,
          },
          (payload) => {
            onPayload(payload);
          },
        );
      });
    } else {
      channel = channel.on<T>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
          filter,
        },
        (payload) => {
          onPayload(payload);
        },
      );
    }
    return channel.subscribe();
  };

  let subscription = createSubscription();

  const startListening = async () => {
    if (!document.hidden) {
      if (subscription) {
        await subscription.unsubscribe();
      }
      startInitialLoad();
      subscription = createSubscription();
    }
  };

  window.addEventListener("visibilitychange", startListening);
  window.addEventListener("online", startListening);

  return () => {
    subscription.unsubscribe();
    window.removeEventListener("visibilitychange", startListening);
    window.removeEventListener("online", startListening);
  };
}
