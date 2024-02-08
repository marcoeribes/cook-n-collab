import { User, Session } from "@supabase/supabase-js";

export default interface SessionProps {
  userProps: User;
  sessionProps: Session;
}
