import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FAQ, updateFAQ } from "@/lib/api";
import { useState } from "react";

interface FAQEditorProps {
  faq: FAQ | null;
  onClose: () => void;
  onSave: () => void;
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
];

export function FAQEditor({ faq, onClose, onSave }: FAQEditorProps) {
  const [formData, setFormData] = useState<Partial<FAQ>>(
    faq || { question: "", answer: "", language: "en" }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (faq?.id && formData) {
      const result = await updateFAQ(faq.id, formData);
      if (result) {
        onSave();
      }
    }
  };

  return (
    <Dialog open={!!faq} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{faq ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <Input
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="Enter the question"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Answer</label>
            <Textarea
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              placeholder="Enter the answer"
              rows={6}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select
              value={formData.language}
              onValueChange={(value) =>
                setFormData({ ...formData, language: value })
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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}