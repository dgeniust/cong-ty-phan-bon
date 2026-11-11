"use client";

import { createElement, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SmartImage } from "@/components/shared/smart-image";
import { ICON_NAMES, getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-brand-700">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 }) {
  return <div className={cn("grid gap-4", cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>{children}</div>;
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
  placeholder?: string;
};

export function Field({ label, value, onChange, multiline, hint, placeholder }: FieldProps) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <Textarea id={id} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <Input id={id} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SwitchField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
      <input type="checkbox" className="size-4 accent-brand-600" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>Icon</Label>
      <div className="flex items-center gap-2">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
          {createElement(getIcon(value), { className: "size-5", "aria-hidden": true })}
        </span>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] outline-none hover:border-brand-300 focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/15"
        >
          {ICON_NAMES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload thất bại");
      onChange(json.url);
      toast.success("Đã tải ảnh lên");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-3">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface">
          {value && <SmartImage src={value} alt="" fill sizes="80px" className="object-cover" />}
        </div>
        <div className="flex-1 space-y-2">
          <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/... hoặc https://..." />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
          <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? <Loader2 className="animate-spin" /> : <ImageUp />} Tải ảnh lên
          </Button>
        </div>
      </div>
    </div>
  );
}

function move<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
}

type ListEditorProps<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  itemLabel: (item: T, i: number) => string;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  addLabel?: string;
  min?: number;
};

export function ListEditor<T extends object>({ items, onChange, create, itemLabel, renderItem, addLabel = "Thêm", min = 0 }: ListEditorProps<T>) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl bg-surface p-4 md:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-brand-800">
              #{i + 1} · {itemLabel(item, i) || "(chưa đặt tên)"}
            </span>
            <div className="flex gap-1">
              <Button type="button" size="icon" variant="ghost" className="size-8" aria-label="Lên" disabled={i === 0} onClick={() => onChange(move(items, i, i - 1))}>
                <ArrowUp />
              </Button>
              <Button type="button" size="icon" variant="ghost" className="size-8" aria-label="Xuống" disabled={i === items.length - 1} onClick={() => onChange(move(items, i, i + 1))}>
                <ArrowDown />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-8 text-destructive hover:text-destructive"
                aria-label="Xoá"
                disabled={items.length <= min}
                onClick={() => onChange(items.filter((_, j) => j !== i))}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          {renderItem(item, (patch) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it))))}
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, create()])}>
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}

export function StringListEditor({ label, items, onChange, multiline }: { label: string; items: string[]; onChange: (v: string[]) => void; multiline?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex gap-2">
            {multiline ? (
              <Textarea value={v} rows={3} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
            ) : (
              <Input value={v} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
            )}
            <Button type="button" size="icon" variant="ghost" className="shrink-0 text-destructive" aria-label="Xoá dòng" onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <Trash2 />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
          <Plus /> Thêm dòng
        </Button>
      </div>
    </div>
  );
}
