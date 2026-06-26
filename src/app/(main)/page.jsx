import FeaturedAnimals from "@/components/home/FeaturedAnimals";
import Hero from "@/components/home/Hero";
import QurbaniTips from "@/components/home/QurbaniTips";
import TopBreeds from "@/components/home/TopBreeds";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { getAnimals } from "@/lib/data";

export default async function HomePage() {
  const animals = await getAnimals();
  const featuredAnimals = animals.slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedAnimals animals={featuredAnimals} />
      <QurbaniTips />
      <TopBreeds />
      <WhyChooseUs />
    </>
  );
}
