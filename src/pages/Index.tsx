import { FAQList } from "@/components/FAQList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto p-4 bg-primary">
          <h1 className="text-2xl font-bold text-center text-white">FastFAQ</h1>
        </div>
      </header>
      <main>
        <FAQList />
      </main>
    </div>
  );
};

export default Index;