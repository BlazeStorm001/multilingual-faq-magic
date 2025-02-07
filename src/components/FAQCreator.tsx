import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FAQ, createFAQ } from "@/lib/api";
import Editor from "./Editor";

interface FAQCreatorProps {
  open: boolean;
  onClose: () => void;
  onSave: (faq: Partial<FAQ>) => void;
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
];

export function FAQCreator({ open, onClose, onSave }: FAQCreatorProps) {
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: "",
    answer: "",
    language: "en",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createFAQ(formData);
    if (result) {
      onSave(result);
      setFormData({ question: "", answer: "", language: "en" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New FAQ</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <Input
              value={formData.question}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, question: e.target.value }))
              }
              placeholder="Enter the question"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Answer</label>
            <Editor
              value={formData.answer || ""}
              onChange={(data) => setFormData((prev) => ({ ...prev, answer: data }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select
              value={formData.language}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, language: value }))
              }
            >
              <SelectTrigger>
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
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create FAQ</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}