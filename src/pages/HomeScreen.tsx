import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client.ts";

type Country = {
  name: string;
  // include other properties if needed
};

export default function HomeScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  // rest of your code

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data || []);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}
