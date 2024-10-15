import { createClient } from "utils/supabase/sever";

export default function useSeverUser() {
  const session = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const sessionId = data.user?.id;
    return sessionId;
  };
  return { session };
}
