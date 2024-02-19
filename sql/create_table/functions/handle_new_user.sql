/* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.*/ 
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profile (profile_id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();