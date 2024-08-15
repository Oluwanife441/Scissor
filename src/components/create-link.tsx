import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState, ChangeEvent, RefObject } from "react";
import Error from "./error";
import * as yup from "yup";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { useUrlContext } from "@/context";
import { QRCode } from "react-qrcode-logo";
import useMyFetch from "@/hooks/use-fetcth2";

interface FormValues {
  title: string;
  longUrl: string;
  customUrl: string;
}

interface Errors {
  title?: string;
  longUrl?: string;
  [key: string]: string | undefined;
}
export function CreateLink() {
  const { user } = useUrlContext();
  const qrCodeRef = useRef<QRCode>(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState<Errors>({});
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    longUrl: longLink || "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useMyFetch(createUrl, { ...formValues, user_id: user?.id });

  useEffect(() => {
    if (!error && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data, navigate]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = (
        qrCodeRef.current as unknown as {
          canvasRef: RefObject<HTMLCanvasElement>;
        }
      )?.canvasRef.current;
      if (!canvas) {
        console.error("Canvas reference is null");
        return;
      }

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve)
      );
      if (!blob) {
        console.error("Failed to generate blob from canvas");
        return;
      }

      console.log("Form Values:", formValues);
      console.log("QR Code Blob:", blob);

      // Call the function with form values and the blob separately
      await fnCreateUrl(formValues, blob);
    } catch (e) {
      const newErrors: Errors = {};

      if (e instanceof yup.ValidationError) {
        e.inner.forEach((err) => {
          newErrors[err.path ?? "unknown"] = err.message;
        });
      } else {
        console.error("Unexpected error:", e);
      }

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={!!longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        {formValues.longUrl && (
          <QRCode ref={qrCodeRef} size={250} value={formValues.longUrl} />
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your Long URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">scissor.com</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        {error && <Error message={error.message} />}
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
