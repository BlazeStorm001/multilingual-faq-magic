import { FAQList } from "@/components/FAQList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">FAQ Management System</h1>
        </div>
      </header>
      <main>
        <FAQList />
      </main>
    </div>
  );
};

export default Index;