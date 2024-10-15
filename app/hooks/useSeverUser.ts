import { createClient } from "utils/supabase/sever";

export default function useSeverUser() {
  const session = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const session = data.user?.id;
    return session;
  };
  return { session };
}
