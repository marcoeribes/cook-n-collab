import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client.ts";

type Country = {
  name: string;
  // include other properties if needed
};

export default function CountryScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [isAddCountry, setIsAddCountry] = useState(true);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data || []);
  }

  async function addCountries(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data, error } = await supabase
      .from("countries")
      .insert([{ name: newCountry }]);
    if (error) {
      console.error("Error adding country:", error.message);
    } else if (data) {
      console.log("Country added:", data);
      setCountries((prevCountries) => [...prevCountries, data[0]]);
    }
  }

  async function deleteCountry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await supabase
      .from("countries")
      .delete()
      .eq("name", newCountry);
    if (error) {
      console.error("Error deleting country:", error.message);
    } else {
      console.log("Country deleted:", newCountry);
      setCountries((prevCountries) =>
        prevCountries.filter((c) => c.name !== newCountry)
      );
    }
  }

  let handleSubmit = isAddCountry ? addCountries : deleteCountry;

  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Country Name"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
        />
        <input
          type="submit"
          value={isAddCountry ? "Add Country" : "Delete Country"}
        />
        <button onClick={() => setIsAddCountry(!isAddCountry)}>
          Switch to {isAddCountry ? "Add Country" : "Delete Country"}
        </button>
      </form>
    </>
  );
}
