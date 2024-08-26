import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <div className="px-5 py-4 md:px-10 md:py-8">
        <Header />
        <Hero />
      </div>
      <Content />
      <Footer/>
    </div>
  );
}
