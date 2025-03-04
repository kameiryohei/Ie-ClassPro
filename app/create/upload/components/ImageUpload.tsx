"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import toast from "react-hot-toast";
import { createClient } from "utils/supabase/client";

export function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const supabase = createClient();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        const file = acceptedFiles[0];

        if (!file) {
          throw new Error("ファイルを選択してください");
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `upload-${Math.random()}.${fileExt}`;
        const filePath = fileName;

        // 画像をアップロード
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data, error } = await supabase.storage
          .from("avatars")
          .createSignedUrl(filePath, 600); // 10分間有効

        if (error) {
          toast.error("画像の取得に失敗しました");
          return;
        }

        const url = data.signedUrl;
        setImageUrl(url);

        toast.success("画像をアップロードしました");
      } catch (error) {
        toast.error("画像のアップロードに失敗しました");
      } finally {
        setUploading(false);
      }
    },
    [supabase]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024, //サイズは1MBまで
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>画像アップロード</CardTitle>
        <CardDescription>
          画像をドラッグ&ドロップするか、クリックして選択してください
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8
            text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25"
            }
          `}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>アップロード中...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isDragActive
                  ? "ドロップしてアップロード"
                  : "クリックまたはドラッグ&ドロップ"}
              </p>
            </div>
          )}
        </div>

        {imageUrl && (
          <div className="space-y-2">
            <p className="text-sm font-medium">アップロード完了</p>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
              <Image
                src={imageUrl}
                alt="Uploaded"
                className="object-cover"
                width={500}
                height={300}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
