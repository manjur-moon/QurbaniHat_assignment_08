import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "public", "animals.json");

export async function getAnimals() {
  const file = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(file);
}

export async function getAnimalById(id) {
  const animals = await getAnimals();
  return animals.find((animal) => String(animal.id) === String(id));
}
