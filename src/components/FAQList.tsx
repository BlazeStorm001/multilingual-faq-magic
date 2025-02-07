import { useQuery } from "@tanstack/react-query";
import { FAQ, fetchFAQs } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { FAQEditor } from "./FAQEditor";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
];

export function FAQList() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  const { data: faqs = [], isLoading, refetch } = useQuery({
    queryKey: ["faqs", selectedLang],
    queryFn: () => fetchFAQs(selectedLang),
  });

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedLang} onValueChange={setSelectedLang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading FAQs...</div>
        ) : filteredFAQs.length === 0 ? (
          <div className="text-center py-8">No FAQs found</div>
        ) : (
          <div className="grid gap-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {faq.question}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingFAQ(faq)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this FAQ?")) {
                          // Implement delete functionality
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <FAQEditor
        faq={editingFAQ}
        onClose={() => setEditingFAQ(null)}
        onSave={async () => {
          await refetch();
          setEditingFAQ(null);
        }}
      />
    </div>
  );
}